import client from '../../client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolversFn = async (_, { id }, { loggedInUser }) => {
	const photo = await client.photo.findUnique({
		where: {
			id,
		},
	});

	if (!photo) {
		return {
			ok: false,
			error: 'Photo not found',
		};
	}

	const likeWhere = {
		photoId_userId: {
			userId: loggedInUser.id,
			photoId: id,
		},
	};

	const like = await client.like.findUnique({
		where: likeWhere,
	});

	if (like) {
		await client.like.delete({
			where: likeWhere,
		});
	} else {
		await client.like.create({
			data: {
				user: {
					connect: {
						id: loggedInUser.id,
					},
				},
				photo: {
					connect: {
						id: photo.id,
					},
				},
			},
		});
	}

	return {
		ok: true,
	};
};

const resolvers: Resolvers = {
	Mutation: {
		toggleLike: protectedResolver(resolversFn),
	},
};

export default resolvers;
