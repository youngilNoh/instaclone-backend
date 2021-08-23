import client from '../../client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

const resolversFn = async (_, { id, caption }, { loggedInUser }) => {
	const oldPhoto = await client.photo.findFirst({
		where: {
			id,
			userId: loggedInUser.id,
		},
		include: {
			hashtags: {
				select: {
					hashtag: true,
				},
			},
		},
	});

	if (!oldPhoto) {
		return {
			ok: false,
			error: 'Photo not found.',
		};
	}
	await client.photo.update({
		where: {
			id,
		},
		data: {
			caption,
			hashtags: {
				disconnect: oldPhoto.hashtags,
				connectOrCreate: processHashtags(caption),
			},
		},
	});

	return {
		ok: true,
	};
};

const resolvers: Resolvers = {
	Mutation: {
		editPhoto: protectedResolver(resolversFn),
	},
};

export default resolvers;
