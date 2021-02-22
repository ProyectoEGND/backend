"use strict";

var multer = require('multer');

var path = require('path');

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, '../storage/imgs'));
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname, "-").concat(Date.now(), ".png"));
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 4200000
  },
  fileFilter: (req, file, cb) => {
    var fileType = /jpeg|jpg|png|gif/;
    var mimetype = fileType.test(file.mimetype);
    var extname = fileType.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb('Error: solo se permiten imagenes validas');
  }
});
module.exports = upload;