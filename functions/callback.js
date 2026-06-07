export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  const token = data.access_token;
  const provider = 'github';

  if (!token) {
    return new Response('Auth failed', { status: 401 });
  }

  const html = `
<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e);
      window.opener.postMessage(
        'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
        e.origin
      );
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:${provider}", "*");
  })()
</script>
<p>Authenticating, please wait...</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}