function JwtCallback({  profile, token, user, properties  }) {
  if (profile?.[properties.profileRolesField]) {
    token.roles = profile[properties.profileRolesField];
  }
  if (user?.[properties.userRolesField]) {
    token.roles = user[properties.userRolesField];
  }
  return token;
}

JwtCallback.meta = {
  type: 'jwt',
};

export default JwtCallback;
