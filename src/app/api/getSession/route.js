import { getCustomSession } from '../sessionCode';

export async function GET(req) {
  const session = await getCustomSession();

  if (session.email) {
    return new Response(
      JSON.stringify({
        success: true,
        email: session.email,
        acc_type: session.acc_type,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, message: 'No active session' }),
      { status: 401 }
    );
  }
}
