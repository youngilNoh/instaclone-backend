import bcrypt from 'bcrypt';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
	Mutation: {
		createAccount: async (
			_,
			{ firstName, lastName, username, email, password },
			{ client }
		) => {
			try {
				const existingUser = await client.user.findFirst({
					where: { OR: [{ username }, { email }] },
				});
				const uglyPasswrod = await bcrypt.hash(password, 10);

				if (existingUser) {
					throw new Error('username or email ia already taken.');
				}

				return client.user.create({
					data: {
						username,
						email,
						firstName,
						lastName,
						password: uglyPasswrod,
					},
				});
			} catch (error) {
				return error;
			}
		},
	},
};

export default resolvers;
