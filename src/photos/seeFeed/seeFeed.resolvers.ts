import client from '../../client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolversFn = (_, __, { loggedInUser }) =>
	client.photo.findMany({
		where: {
			OR: [
				{
					user: {
						followers: {
							some: {
								id: loggedInUser.id,
							},
						},
					},
				},
				{
					userId: loggedInUser.id,
				},
			],
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

const resolvers: Resolvers = {
	Query: {
		seeFeed: protectedResolver(resolversFn),
	},
};

export default resolvers;
