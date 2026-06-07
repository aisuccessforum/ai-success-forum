import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID     = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export async function GET(
  req: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  const action = params.nextauth[0];

  if (action === 'auth') {
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
    return NextResponse.redirect(url);
  }

  if (action === 'callback') {
    const code = req.nextUrl.searchParams.get('code');
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    });
    const data = await response.json();
    const token = data.access_token;

    return new NextResponse(
      `<html><body><script>
        const receiveMessage = (e) => {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
            e.origin
          );
        };
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      </script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}