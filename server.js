// .env를 활성화 할 수 있도록 dotenv를 설치하여 실행
require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';

const server = new ApolloServer({
	schema,
});

// .env에서 포트번호 바꾼거 적용
const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`👑 Server is running on http://localhost:${PORT}/`));
