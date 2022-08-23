import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import CustomError from '../Errors/CustomError';
import Users from '../database/models/User';

export default class UserService {
  private model = Users;

  async login(email: string, passwordIn: string): Promise<string> {
    const user = await this.model.findOne({ where: { email }, raw: true });
    if (!user) throw new CustomError('Incorrect email or password', 401);
    const passValid = await bcrypt.compare(passwordIn, user.password);
    if (!passValid) throw new CustomError('Incorrect email or password', 401);
    const { password, ...rest } = user;
    const token = jwt.sign(rest, 'jwt_secret');
    return token;
  }

  async getRole(token: string | undefined) {
    if (!token) throw new CustomError('token is required', 401);
    const decodedToken = jwt.verify(token, 'jwt_secret') as jwt.JwtPayload;
    const user = await this.model.findOne({ where: { id: decodedToken.id } });
    return user?.role;
  }
}
