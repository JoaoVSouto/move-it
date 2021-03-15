import { NextApiHandler } from 'next';

import getConnection from '../../../db/getConnection';
import ensureAuthenticated from '../../../middleware/ensureAuthenticated';

interface LeaderboardResponse {
  data: Array<{
    data: {
      name: string;
      avatar_url: string;
      level: number;
      experience: number;
      challenges_completed: number;
    };
  }>;
}

const leaderboard: NextApiHandler = async (req, res) => {
  const token = await ensureAuthenticated(req);

  if (!token) {
    return res.status(401).json({ error: 'Autentique-se na aplicação.' });
  }

  if (req.method === 'GET') {
    const { faunaClient, q } = getConnection();

    try {
      const { data } = await faunaClient.query<LeaderboardResponse>(
        q.Map(
          q.Paginate(q.Match(q.Index('user_sort_by_experience_desc'))),
          q.Lambda(['_', 'ref'], q.Get(q.Var('ref')))
        )
      );

      const users = data.map(user => ({
        name: user.data.name,
        avatar_url: user.data.avatar_url,
        level: user.data.level,
        experience: user.data.experience,
        challenges_completed: user.data.challenges_completed,
      }));

      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ error: 'Não foi possível obter ranking.' });
    }
  }

  return res.status(406).json({ error: 'Verbo HTTP não suportado.' });
};

export default leaderboard;
