export interface IUserData {
  bio: string;
  email: string;
  image?: string;
  // Make the token property optional, as required by the Rosters component.
  // old code: token: string;
  token?: string;
  username: string;
}

export interface IUserRO {
  user: IUserData;
}
