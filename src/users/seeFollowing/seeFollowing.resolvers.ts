import { Resolvers } from '../../types';

const resolvers: Resolvers = {
	Query: {
		seeFollowing: async (_, { username, lastId }, { client }) => {
			const ok = await client.user.findUnique({
				where: { username },
				select: { id: true },
			});
			if (!ok) {
				return {
					ok: false,
					error: 'Cannot find User',
				};
			}
			const following = await client.user
				.findUnique({ where: { username } })
				.following({
					take: 5,
					skip: lastId ? 1 : 0,
					...(lastId && { cursor: { id: lastId } }),
				});
			return {
				ok: true,
				following,
			};
		},
	},
};

export default resolvers;
