import mongoose from 'mongoose';

mongoose
	.connect('mongodb://localhost/tiendaDb', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then((db) => console.log('conectado'))
	.catch((error) => console.log('error'));
