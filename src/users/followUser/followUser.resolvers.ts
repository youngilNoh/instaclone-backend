import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolversFn = async (_, { username }, { loggedInUser, client }) => {
	const ok = await client.user.findUnique({ where: { username } });
	if (!ok) {
		return {
			ok: false,
			error: 'That user does not exist.',
		};
	}
	await client.user.update({
		where: {
			id: loggedInUser.id,
		},
		data: {
			following: {
				connect: {
					username,
				},
			},
		},
	});
	return {
		ok: true,
	};
};

const resolvers: Resolvers = {
	Mutation: {
		followUser: protectedResolver(resolversFn),
	},
};

export default resolvers;
