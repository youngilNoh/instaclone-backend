import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolversFn = async (_, { username }, { loggedInUser, client }) => {
	const ok = await client.user.findUnique({ where: { username } });
	if (!ok) {
		return {
			ok: false,
			error: "Can't unfollow user.",
		};
	}
	await client.user.update({
		where: {
			id: loggedInUser.id,
		},
		data: {
			following: {
				disconnect: {
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
		unfollowUser: protectedResolver(resolversFn),
	},
};

export default resolvers;
