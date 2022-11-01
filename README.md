# starter-jwt

A lowdefy monorepo starter for jwt auth.

### Setup

1. Sign-in with JWT signed using RS256, so we need:

- You can setup a private key: $ ssh-keygen -t rsa -P "" -b 4096 -m PEM -f app-lowdefy.key
  - Please keep the private key secure, you'll use this to generate a JWT every time you need to generate a new token.
- Generate a public key: $ ssh-keygen -e -m PEM -f app-lowdefy.key > app-lowdefy.key.pub

3. The following JWT claims should be applied to the JWT payload:
   Standard claims:

- Audience claim (aud) should be eg. `https://example.lowdefy.app`
- Issuer (iss) should be eg. `https://your-domain.com`
- Token issued at time (iat) claim at current time (epoch seconds).
- Add expiry time for 2 min (exp) from current time (epoch seconds).

Any additional data can be included in the token and mapped to the user object with `auth.userFields`.

NOTE: You can also switch to HS256, which is a little simpler if needed.

4. The iframe url should be `https://example.lowdefy.app/iframe-login?page={{ page }}&token={{ token }}` where:

- page (eg. "new-page")[required]: The initial page redirect after iframe login for the given user.
- token (RS256 jwt): Provide sign in token as specified.

Example:
JWT Payload:

```
{
  "iss": "https://example.lowdefy.app",
  "aud": "https://your-domain.com",
  "iat": 1657707048,
  "exp": 1657707178,
  // .. any additional payload fields
}
```

### To test:

- Comment out cookies.
- Change alg to RS256.
- Generate token.
  ```
  {
    "sub": "1234567890",
    "iat": 1663625096,
    "exp": 1763626138,
    "aud": "http://localhost:3000",
    "iss": "https://example.lowdefy.app",
    // .. any additional payload fields
  }
  ```
- Go to link: http://localhost:3000/iframe-login?page=new-page&token={{ token }}
