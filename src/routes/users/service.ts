import { hash } from "../../lib/bcrypt";
import prisma from "../../lib/db";

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (createUserDto: CreateUserDto) => {
  const { name, email, password } = createUserDto;
  const hashedPassword = await hash(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};
