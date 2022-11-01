import CredentialsProvider from 'next-auth/providers/credentials';
import createAuthorize from './createAuthorize.js';

function JWTProvider({ id, issuer, publicKey, roles }) {
  // next-auth is not exporting correctly for es modules
  // this might break with a next-auth update
  return CredentialsProvider.default({
    id: id ?? 'jwt_provider',
    name: 'JWTProvider',
    credentials: {
      token: { label: 'Token', type: 'text' },
    },
    authorize: createAuthorize({ issuer, publicKey, roles }),
  });
}

export default JWTProvider;
