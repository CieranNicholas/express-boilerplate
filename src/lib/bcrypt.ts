import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hash = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
};

export const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
	const retval = await bcrypt.compare(password, hashedPassword);
	return retval;
};
