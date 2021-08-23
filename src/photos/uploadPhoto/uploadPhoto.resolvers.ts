import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

const resolversFn = async (_, { file, caption }, { loggedInUser, client }) => {
	let hashtagObj = null;
	if (caption) {
		hashtagObj = processHashtags(caption);
	}
	return client.photo.create({
		data: {
			file,
			caption,
			user: {
				connect: {
					id: loggedInUser.id,
				},
			},
			...(hashtagObj.length > 0 && {
				hashtags: {
					connectOrCreate: hashtagObj,
				},
			}),
		},
	});
	// save the photo WITH the parsed hashtas
	// add the photo to the hashtags
};

const resolvers: Resolvers = {
	Mutation: {
		uploadPhoto: protectedResolver(resolversFn),
	},
};

export default resolvers;
