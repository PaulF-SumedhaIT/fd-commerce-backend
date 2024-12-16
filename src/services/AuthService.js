const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (email, name, password) => {
  if (!email || !name || !password) {
    const error = new Error('All fields (email, name, password) are required.');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error('User with this email already exists.');
    error.statusCode = 409; //
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

module.exports = { registerUser, loginUser };