import { createWriteStream } from 'fs';
import bcrypt from 'bcrypt';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolversFn = async (
	_,
	{ firstName, lastName, username, email, password: newPassword, bio, avatar },
	{ loggedInUser, client }
) => {
	const { filename, createReadStream } = await avatar;
	const readStream = createReadStream();
	const writeStream = createWriteStream(process.cwd() + '/uploads/' + filename);
	readStream.pipe(writeStream);
	let uglyPasswrod = null;
	if (newPassword) {
		uglyPasswrod = await bcrypt.hash(newPassword, 10);
	}
	const updatedUser = await client.user.update({
		where: {
			id: loggedInUser.id,
		},
		data: {
			firstName,
			lastName,
			username,
			email,
			bio,
			// avatar,
			...(uglyPasswrod && { password: uglyPasswrod }),
		},
	});
	if (updatedUser.id) {
		return {
			ok: true,
		};
	} else {
		return {
			ok: false,
			error: 'Could not update profile.',
		};
	}
};

const resolvers: Resolvers = {
	Mutation: {
		editProfile: protectedResolver(resolversFn),
	},
};

export default resolvers;
