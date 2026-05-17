export const USERS = {
  valid: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
  invalidUsername: {
    username: 'wronguser',
    password: 'SuperSecretPassword!',
  },
  invalidPassword: {
    username: 'tomsmith',
    password: 'wrongpassword',
  },
} as const;
