import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/users';

export const verifyToken = async (req, res, next) => {
	console.log(req.headers['x-access-token']);
	try {
		console.log('entro');
		const token = req.headers['x-access-token'];

		if (!token) return res.status(403).json({ mensaje: 'enviar token' });
		const decoded = jwt.verify(token, config.SECRET);

		const user = await User.findById(decoded.id, { password: 0 });

		if (!user) return res.status(404).json({ message: 'usuario no encontrado', preferencias: null });

		req.userId = user._id;
		req.tienda = user.tienda;
		req.padre = user.username;
		next();
	} catch (error) {
		res.status(401).json({ message: 'acceso no autorizado' });
	}
};
