import { NextApiRequest } from 'next';
import jwt from 'next-auth/jwt';

interface Token {
  name: string;
  email: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
}

const secret = process.env.JWT_SECRET;

export default async function ensureAuthenticated(req: NextApiRequest) {
  const token = (await jwt.getToken({ req, secret })) as Token;

  return token || null;
}
