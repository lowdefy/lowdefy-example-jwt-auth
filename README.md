
# lowdefy-example-jwt-auth
This example creates a custom Auth.js credentials provider that uses JSON web tokens (JWT) as credentials.
This plugin could be used when linking from a third-party app or when hosting the Lowdefy app on an iframe in a third-party app where the third party app generates the JWT.

We recommend going through the following resources before continuing with this example:
- [Lowdefy User Authentication docs](https://docs.lowdefy.com/users-introduction)
- [Nextauth.js credentials docs](https://next-auth.js.org/providers/credentials)

## Setup

### 1. Sign-in with JWT signed using RS256, so you will need a private and public key:

1. You can setup a private key:
 Please keep the private key secure, you'll use this to generate a JWT every time you need to generate a new token.

```
 ssh-keygen -t rsa -P "" -b 4096 -m PEM -f app-lowdefy.key
```
1.  Generate a public key:
```
ssh-keygen -e -m PEM -f app-lowdefy.key > app-lowdefy.key.pub
```

### 2. The following JWT claims should be applied to the JWT payload:

Standard claims:

- Audience claim (aud) should be eg. `https://example.lowdefy.app`
- Issuer (iss) should be eg. `https://your-domain.com`
- Token issued at time (iat) claim at current time (epoch seconds).
- Add expiry time for 2 min (exp) from current time (epoch seconds).

Any additional data can be included in the token and mapped to the user object with `auth.userFields`.

>[!NOTE]
>You can also switch to HS256, which is a little simpler if needed.

To read more about what JWT claims are, see this [page](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims).

### 3. The iframe url

should be `https://example.lowdefy.app/iframe-login?page={{ page }}&token={{ token }}` where:
- **{{ page }}** (eg. "new-page")[required]: The initial page redirect after iframe login for the given user.
- **{{ token }}** (RS256 jwt): Provide sign in token as specified.

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
## To test:

- Cookies are commented out by default in `lowdefy.yaml`, if they are commented in, this will not work for local dev
- Change alg to RS256 in `providers/JWTProvider/createAuthorize.js`
- Generate token using [JWT.io](jwt.io).
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
