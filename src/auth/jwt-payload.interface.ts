export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: string;

  userId: number;
  username: string;
}
