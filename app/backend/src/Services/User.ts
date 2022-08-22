import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import CustomError from '../Errors/CustomError';
import Users from '../database/models/User';

export default class UserService {
  private model = Users;

  async login(email: string, passwordIn: string): Promise<string> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) throw new CustomError('Wrong Credentials', 422);
    const passValid = await bcrypt.compare(passwordIn, user.password);
    if (!passValid) throw new CustomError('Wrong Credentials', 422);
    const { password, ...rest } = user;
    const token = jwt.sign(rest, 'process.env.JWT_SECRET');
    return token;
  }
}
