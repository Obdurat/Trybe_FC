interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

interface MatchesAttributes {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

interface TeamsAttributes {
  id: number;
  teamName: string;
}

export { UserAttributes, TeamsAttributes, MatchesAttributes };
