const http = require('http');

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f3f5ef">
  <title>Sign in | Morrow</title>
  <style>
    :root {
      color-scheme: light;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #1d2924;
      background: #f3f5ef;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    * { box-sizing: border-box; }

    body {
      min-height: 100vh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 40px 24px;
      background:
        radial-gradient(ellipse at 12% 14%, rgba(201, 218, 198, .48), transparent 34%),
        radial-gradient(ellipse at 91% 88%, rgba(234, 220, 196, .48), transparent 32%),
        #f3f5ef;
    }

    .shell {
      width: min(100%, 480px);
      display: grid;
      grid-template-columns: 1fr;
      overflow: hidden;
      border: 1px solid rgba(32, 54, 44, .08);
      border-radius: 24px;
      background: #fff;
      box-shadow: 0 28px 80px rgba(37, 55, 45, .12), 0 4px 12px rgba(37, 55, 45, .04);
    }

    .form-side {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 54px clamp(28px, 6vw, 72px);
    }

    .form-wrap { width: 100%; max-width: 360px; }

    .form-wrap h2 {
      margin: 0;
      color: #1e2b25;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 36px;
      font-weight: 400;
      letter-spacing: -.045em;
    }

    .intro {
      margin: 10px 0 32px;
      color: #758079;
      font-size: 14px;
      line-height: 1.6;
    }

    .field { margin-bottom: 20px; }

    label {
      display: block;
      margin-bottom: 8px;
      color: #354139;
      font-size: 12px;
      font-weight: 650;
    }

    input[type="email"], input[type="password"], input[type="text"] {
      width: 100%;
      height: 48px;
      padding: 0 14px;
      border: 1px solid #dfe5df;
      border-radius: 9px;
      outline: none;
      color: #1d2924;
      background: #fff;
      font: inherit;
      font-size: 14px;
      transition: border-color .18s ease, box-shadow .18s ease;
    }

    input::placeholder { color: #a5ada7; }

    input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus {
      border-color: #527b65;
      box-shadow: 0 0 0 3px rgba(82, 123, 101, .12);
    }

    .password-box { position: relative; }
    .password-box input { padding-right: 68px; }

    .show-password {
      position: absolute;
      top: 50%;
      right: 12px;
      padding: 5px 3px;
      transform: translateY(-50%);
      border: 0;
      color: #637168;
      background: transparent;
      font: inherit;
      font-size: 11px;
      font-weight: 650;
      cursor: pointer;
    }

    .show-password:hover { color: #244b39; }

    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin: 2px 0 24px;
    }

    .remember {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      color: #667168;
      font-size: 12px;
      font-weight: 450;
      cursor: pointer;
    }

    .remember input {
      width: 15px;
      height: 15px;
      margin: 0;
      accent-color: #28523e;
    }

    .forgot {
      padding: 0;
      border: 0;
      color: #315d44;
      background: transparent;
      font: inherit;
      font-size: 12px;
      font-weight: 650;
      cursor: pointer;
    }

    .submit {
      width: 100%;
      min-height: 48px;
      border: 0;
      border-radius: 9px;
      color: #fff;
      background: #244b39;
      font: inherit;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      transition: background .18s ease, transform .18s ease;
    }

    .submit:hover { transform: translateY(-1px); background: #1b3d2e; }
    .submit:focus-visible, .forgot:focus-visible, .show-password:focus-visible {
      outline: 3px solid rgba(82, 123, 101, .35);
      outline-offset: 3px;
    }

    .message {
      min-height: 20px;
      margin: 14px 0 0;
      color: #637168;
      font-size: 12px;
      line-height: 1.5;
    }

    .security-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      margin: 33px 0 0;
      color: #8a948d;
      font-size: 11px;
    }

    .security-note svg { flex: 0 0 auto; color: #66836f; }

    @media (max-width: 720px) {
      body { padding: 20px 14px; }
      .shell { max-width: 480px; border-radius: 18px; }
      .form-side { padding: 38px 28px 33px; }
      .form-wrap h2 { font-size: 32px; }
      .intro { margin-bottom: 25px; }
      .security-note { margin-top: 25px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <section class="form-side" aria-labelledby="welcome-heading">
      <div class="form-wrap">
        <h2 id="welcome-heading">Welcome back</h2>
        <p class="intro">Sign in to continue to your Morrow workspace.</p>
        <form id="login-form">
          <div class="field">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autocomplete="username" required>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <div class="password-box">
              <input id="password" name="password" type="password" placeholder="Enter your password" autocomplete="current-password" required>
              <button class="show-password" type="button" aria-controls="password" aria-label="Show password" aria-pressed="false">Show</button>
            </div>
          </div>
          <div class="form-options">
            <label class="remember"><input type="checkbox" name="remember"> Keep me signed in</label>
            <button class="forgot" type="button" id="forgot-password">Forgot password?</button>
          </div>
          <button class="submit" type="submit">Sign in</button>
          <p class="message" id="form-message" role="status" aria-live="polite"></p>
        </form>
        <p class="security-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12a2 2 0 0 1 2 2v8H4v-8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Your workspace is private and secure
        </p>
      </div>
    </section>
  </main>
  <script>
    const password = document.getElementById('password');
    const showPassword = document.querySelector('.show-password');
    const message = document.getElementById('form-message');

    showPassword.addEventListener('click', () => {
      const isVisible = password.type === 'text';
      password.type = isVisible ? 'password' : 'text';
      showPassword.textContent = isVisible ? 'Show' : 'Hide';
      showPassword.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
      showPassword.setAttribute('aria-pressed', String(!isVisible));
    });

    document.getElementById('forgot-password').addEventListener('click', () => {
      message.textContent = 'Password reset is not set up yet. Please contact your workspace administrator.';
    });

    document.getElementById('login-form').addEventListener('submit', (event) => {
      event.preventDefault();
      message.textContent = 'The sign-in form is ready to connect to an authentication service.';
    });
  </script>
</body>
</html>`;

function createServer() {
  return http.createServer((req, res) => {
    if (req.method !== 'GET' || (req.url !== '/' && req.url !== '/login')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(page),
    });
    res.end(page);
  });
}

if (require.main === module) {
  createServer().listen(3000, () => {
    console.log('Server running at http://localhost:3000/login');
  });
}

module.exports = { createServer };