import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers'

const sessionOptions = {
  password: 'VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf',
  cookieName: 'app',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  },
};

export async function getCustomSession() {
  console.log('Initializing session...');
  const session = await getIronSession(cookies(), sessionOptions);
  return session;
}
