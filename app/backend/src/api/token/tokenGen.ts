import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'theSecret';

class tokenStuffs {
  public static genToken = (email: string, username: string, role: string): string => {
    const token = jwt.sign(
      { email, username, role },
      secret,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
    return token;
  };

  public static verifyToken = (token: string) => {
    jwt.verify(token, secret);
  };
}

export default tokenStuffs;
