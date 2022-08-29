import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import BaseRepository from '../Repositories/BaseRepository';
import { RepoDefined } from '../Repositories/RepoFactory';
import { UserAttributes } from '../Repositories/Types';
import CustomError from '../Errors/CustomError';

export default class UserCases {
  private _repository: BaseRepository<UserAttributes>;

  constructor(repositories: RepoDefined) {
    this._repository = repositories._UserRepo;
  }

  private async loginChecker(user: { email: string; password: string }) {
    const [foundUser] = await this._repository
      .getAll(undefined, undefined, undefined, { email: user.email });
    if (!foundUser) throw new CustomError('User does\'t exist', 404);
    const passValid = await bcrypt.compare(user.password, foundUser.get().password);
    if (!passValid) throw new CustomError('Wrong credentials', 401);
    const { password, ...rest } = foundUser.get();
    return rest;
  }

  private async tokenChecker(token: string | undefined) {
    if (!token) throw new CustomError('token is required', 401);
    const decodedToken = jwt.verify(token, 'jwt_secret') as jwt.JwtPayload;
    const user = await this._repository.getById({ id: decodedToken.id });
    return user.get().role;
  }

  async login(user: { email: string; password: string }) {
    const foundUser = await this.loginChecker(user);
    const token = jwt.sign(foundUser, 'jwt_secret');
    return token;
  }

  async getRole(token: string | undefined) {
    const role = await this.tokenChecker(token);
    return { role };
  }
}
