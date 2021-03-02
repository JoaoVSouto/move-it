import { NextApiHandler } from 'next';

import ensureAuthenticated from '../../utils/ensureAuthenticated';

const users: NextApiHandler = async (req, res) => {
  const authenticated = await ensureAuthenticated(req);

  if (!authenticated) {
    return res.status(401).json({ error: 'Autentique-se na aplicação.' });
  }

  return res.status(200).json({ ok: true });
};

export default users;
