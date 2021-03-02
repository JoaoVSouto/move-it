import faunadb from 'faunadb';

export default function getFaunaConnection() {
  const faunaClient = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET_KEY,
  });
  const q = faunadb.query;

  return {
    faunaClient,
    q,
  };
}
