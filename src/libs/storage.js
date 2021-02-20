const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../storage/imgs'));
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}.png`);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 4200000 },
	fileFilter: (req, file, cb) => {
		const fileType = /jpeg|jpg|png|gif/;
		const mimetype = fileType.test(file.mimetype);
		const extname = fileType.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null, true);
		}
		cb('Error: solo se permiten imagenes validas');
	},
});

module.exports = upload;
