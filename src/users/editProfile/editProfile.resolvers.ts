import bcrypt from 'bcrypt';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
	Mutation: {
		editProfile: protectedResolver(
			async (
				_,
				{ firstName, lastName, username, email, password: newPassword },
				{ loggedInUser, client }
			) => {
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
			}
		),
	},
};

export default resolvers;
