function SessionCallback({ session, token }) {
  session.user.roles = token.roles;
  return session;
}

SessionCallback.meta = {
  type: 'session',
};

export default SessionCallback;
