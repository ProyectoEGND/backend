import User from "../models/users";
import Role from "../models/roles";
import jwt from "jsonwebtoken";
import config from "../config";
import nodemailer from "nodemailer";
export const signIn = async (req, res) => {
  let email = req.body.email.toLowerCase();
  const userFound = await User.findOne({ email: email }).populate("roles");
  console.log('inactivo',userFound)
  if (!userFound || userFound.estado === 'Inactivo') {
    res.status(400).json({ message: "user not found", role: ["vendedor"] });
  } else {
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res
        .status(401)
        .json({
          token: null,
          message: "contraseña incorrecta",
          role: [{ name: "vendedor" }],
        });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });
    let admin = userFound.roles.find((role) => role.name === "Admin");

    res
      .status(200)
      .json({ token, role: userFound.roles, tienda: userFound.tienda });
  }
};
export const signUp = async (req, res) => {
  const {
    username,
    email,
    tienda,
    cuit,
    celular,
    password,
    roles,
    nombre,
    estado,
    padre,
    redes,
    desarrollado,
  } = req.body;
  const defaultValue = {
    desarrollado,
    estadoTienda: true,
    mensajeCerrado: "Esta Cerrado",
    horario: [
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
      {
        apertura: 0,
        cierre: 0,
      },
    ],
    montoExtra: {
      descripcion: "",
      monto: 0,
    },
    zonasCompra: [
      {
        zona: "Centro",
        monto: 0,
      },
    ],
    mensajeCompra: {
      encabezado: "Gracias por su compra",
      pie: "Vuelva pronto",
    },
    mensajeWP: "Su pedido realizado es: ",
    fuenteH: "Monserrat",
    fuenteC: "Monserrat",
    fuenteF: "Monserrat",
    hoverColor: "#ff00ff00",
    selectColor: "#ff00ff00",
    fColorH: "#ff0000ff",
    fColorC: "#000000ff",
    fColorF: "#ff0000ff",
    tColorH: "#ffffffff",
    tColorC: "#ffffffff",
    tColorF: "#ffffffff",
    titulo: "Tienda de prueba",
    pie: "Pie de prueba",
    moneda: "PESO ARS - ARGENTINA",
    imagenesH: [],
    imagenesC: [],
    imagenesF: [],
    modal: true,
    tmodal: "texto de prueba",
    imodal: "null",
    logo: "https://api.tienda.delivery/public/logo.jpg",
    whatsapp: "#",
    youtube: "#",
    facebook: "#",
    instagram: "#",
    LinkExterno: "String",
    textlink: "",
    montoMin: 0,
    terminosColor: "#00ff00",
    GeoTienda: "String",
    preguntas: [],
    terminosEstado: false,
    envioGratuito: 0,
    terminos:
      '{"blocks":[{"key":"1inev","text":"Ingrese sus terminos y condiciones","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
  };

  let d = new Date();
  const newUser = new User({
    username,
    email:email.toLowerCase(),
    tienda: tienda.toLowerCase(),
    cuit,
    nombre,
    celular,
    estado,
    padre,
    mercadoPago: {
      activo: false,
      accessToken: "",
    },
    preferencias: defaultValue,
    redes,
    licencia: d.setDate(d.getDate() + 30),
    password: await User.encryptPassword(password),
  });

  if (padre) {
    newUser.padre = padre;
  } else {
    newUser.padre = "Admin";
  }

  if (!estado) {
    newUser.estado = "Activo";
  } else {
    newUser.estado = estado;
  }

  if (roles) {
    const foundRole = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRole.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "Vendedor" });
    newUser.roles = [role._id];
  }
  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  // enviar(email).catch(console.error);
  res.json({ token });
};

async function enviar(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com.ar",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@ventas-online.xyz", // generated ethereal user
      pass: "Welcome01", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <info@ventas-online.xyz>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export const verify = async (req, res) => {
  try {
    // console.log(req.body);
    const token = req.body.token;
    if (!token) return res.status(403).json({ message: "enviar token" });
    const decoded = jwt.verify(token, config.SECRET);

    const user = await User.findById(decoded.id, { password: 0 });

    if (!user) return res.status(404).json({ token: false });
    if (user) return res.status(200).json({ token: true });
  } catch (error) {
    res.status(401).json({ token: false, message: "acceso no autorizado" });
  }
};
