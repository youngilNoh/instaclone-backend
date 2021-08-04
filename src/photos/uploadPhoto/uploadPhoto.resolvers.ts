import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/users.utils';

const resolversFn = async (_, { file, caption }, { loggedInUser, client }) => {
	let hashtagObj = null;
	if (caption) {
		const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\u0E00-\u0E7F|\w]+/g);
		hashtagObj = hashtags?.map((hashtag) => ({
			where: { hashtag },
			create: { hashtag },
		}));
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
