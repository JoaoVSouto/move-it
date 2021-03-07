import { NextApiHandler } from 'next';

import getConnection from '../../../db/getConnection';
import ensureAuthenticated from '../../../middleware/ensureAuthenticated';

const users: NextApiHandler = async (req, res) => {
  const token = await ensureAuthenticated(req);

  if (!token) {
    return res.status(401).json({ error: 'Autentique-se na aplicação.' });
  }

  if (req.method === 'POST') {
    const { faunaClient, q } = getConnection();

    const { email, name, picture } = token;

    try {
      const user = await faunaClient.query(
        q.Get(q.Match(q.Index('get_user_by_avatar_url'), picture))
      );

      return res.status(200).json(user);
    } catch {
      try {
        const user = await faunaClient.query(
          q.Create(q.Collection('users'), {
            data: {
              name,
              email,
              avatar_url: picture,
              level: 1,
              experience: 0,
              challenges_completed: 0,
            },
          })
        );

        return res.status(200).json(user);
      } catch {
        return res
          .status(500)
          .json({ error: 'Não foi possível obter usuário.' });
      }
    }
  }

  return res.status(406).json({ error: 'Verbo HTTP não suportado.' });
};

export default users;
