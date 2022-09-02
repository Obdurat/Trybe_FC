import { ModelDefined, Model, ModelAttributes } from 'sequelize';

type updtAttr<T> = {
  [P in keyof T]?: T[P]
};

type Junction = UserAttributes | MatchesAttributes | TeamsAttributes;

interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface MatchesAttributes {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: number;
}

interface TeamsAttributes {
  id: number;
  teamName: string;
}

type Return<T extends Junction> = Model<T, T>;

type ModelOk<T> = ModelDefined<T, T>;

interface RepoFactory {
  usersModel: ModelOk<UserAttributes>
  matchesModel: ModelOk<MatchesAttributes>
  teamsModel: ModelOk<TeamsAttributes>
}

export { UserAttributes,
  TeamsAttributes,
  MatchesAttributes,
  ModelOk,
  Return,
  RepoFactory,
  ModelAttributes,
  updtAttr,
  Junction };
