import jwt from 'jsonwebtoken';

function createAuthorize({ publicKey, issuer, roles }) {
  async function authorize({ token }) {
    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['HS256'],
        // algorithms: ['RS256'],
        audience: process.env.NEXTAUTH_URL,
        issuer,
        maxAge: '2m', // Shorter
      });
      return {
        ...decoded,
        jwt_user: true,
        roles,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return authorize;
}

export default createAuthorize;
