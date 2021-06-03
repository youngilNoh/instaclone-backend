import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
	Mutation: {
		login: async (_, { username, password }, { client }) => {
			// find user with args.username
			const user = await client.user.findFirst({ where: { username } });
			if (!user) {
				return {
					ok: false,
					error: 'User not found.',
				};
			}
			const passwordOk = await bcrypt.compare(password, user.password);
			if (!passwordOk) {
				return {
					ok: false,
					error: 'Incorrect passwrod.',
				};
			}
			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
			// check passwrod with args.password
			// issue a token and send it to the user
		},
	},
};

export default resolvers;
