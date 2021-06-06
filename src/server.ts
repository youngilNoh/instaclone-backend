// .env를 활성화 할 수 있도록 dotenv를 설치하여 실행
require('dotenv').config();
import { ApolloServer } from 'apollo-server';
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

server
	.listen(PORT)
	.then(() => console.log(`👑 Server is running on http://localhost:${PORT}/`));
