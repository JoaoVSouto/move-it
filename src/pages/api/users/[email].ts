import { NextApiHandler } from 'next';

import getFaunaConnection from '../../../utils/getFaunaConnection';
import ensureAuthenticated from '../../../utils/ensureAuthenticated';

const users: NextApiHandler = async (req, res) => {
  const token = await ensureAuthenticated(req);

  if (!token) {
    return res.status(401).json({ error: 'Autentique-se na aplicação.' });
  }

  const { faunaClient, q } = getFaunaConnection();

  if (req.method === 'GET') {
    const {
      query: { email },
    } = req;

    if (token.email !== email) {
      return res
        .status(401)
        .json({ error: 'Você não possui permissão para esta checagem.' });
    }

    try {
      const user = await faunaClient.query(
        q.Get(q.Match(q.Index('get_user_by_email'), email))
      );

      return res.status(200).json(user);
    } catch {
      return res.status(200).json({});
    }
  }

  return res.status(406).json({ error: 'Verbo HTTP não suportado.' });
};

export default users;
