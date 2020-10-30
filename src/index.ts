import dotenv from 'dotenv';

import Application from './app/application';
import MockDatabase from './mock.database';

interface Socket {
	address: string;
	family: string;
	port: number;
}

dotenv.config();

Application(MockDatabase)
.allowCors(['http://localhost:4200', 'http://localhost:8100'])
.listen(process.env.HTTP_PORT, process.env.HTTP_HOST)
.then((address: Socket) => {
	let addressName = `${address.address}:${address.port} (${address.family})`;
	console.log(`Server listening on ${addressName} ...`);
}).catch((error: Error) => {
	console.error('Server Error: ', error.message || error);
});
