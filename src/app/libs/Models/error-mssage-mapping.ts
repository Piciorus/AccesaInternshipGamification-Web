export const ErrorMessageMapping: Record<string, string> = {
  ['INVALID_CREDENTIALS']: 'Invalid username or password',
  ['MISSING_COOKIE']: 'Cookie is missing',
  ['EXPIRED_REFRESH_TOKEN']: 'Session has expired',
  ['INVALID_REFRESH_TOKEN']: 'Session is invalid',
  ['INVALID_USER_FORMAT']: 'User has an invalid format',
  ['USERNAME_ALREADY_REGISTERED']: 'User already registered with this username',
  ['EMAIL_ALREADY_REGISTERED']: 'User already registered with this email',
  ['INVALID_USER']: 'User is invalid',
  ['FORBIDDEN']: 'Access is not allowed',
  ['INVALID_DATA']: 'Data is invalid',
};
