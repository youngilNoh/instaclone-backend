// .env를 활성화 할 수 있도록 dotenv를 설치하여 실행
require('dotenv').config();
import * as express from 'express';
import * as logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import client from './client';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

// .env에서 포트번호 바꾼거 적용
const PORT = process.env.PORT;
const server = new ApolloServer({
	resolvers,
	typeDefs,
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
			client,
		};
	},
});

const app = express();
app.use(logger('tiny'));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
	console.log(`👑 Server is running on http://localhost:${PORT}/`);
});
