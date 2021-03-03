import { NextApiHandler } from 'next';

import getConnection from '../../../db/getConnection';
import ensureAuthenticated from '../../../middleware/ensureAuthenticated';

const users: NextApiHandler = async (req, res) => {
  const token = await ensureAuthenticated(req);

  if (!token) {
    return res.status(401).json({ error: 'Autentique-se na aplicação.' });
  }

  if (req.method === 'PUT') {
    const { faunaClient, q } = getConnection();

    const { id } = req.query;
    const { level, experience, challenges_completed } = req.body;

    try {
      const updatedUser = await faunaClient.query(
        q.Update(q.Ref(q.Collection('users'), id), {
          data: {
            level,
            experience,
            challenges_completed,
          },
        })
      );

      return res.status(200).json(updatedUser);
    } catch {
      return res
        .status(401)
        .json({ error: 'Não foi possível atualizar este usuário.' });
    }
  }

  return res.status(406).json({ error: 'Verbo HTTP não suportado.' });
};

export default users;
