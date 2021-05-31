import mongoose from 'mongoose';

mongoose
	.connect('mongodb://34.224.5.110/tiendaDb', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
	})
	.then((db) => console.log('conectado'))
	.catch((error) => console.log('error'));
