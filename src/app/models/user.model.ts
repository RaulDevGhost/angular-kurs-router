/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Credentials {
  email: string;
  password: string;
}
export interface Login {
  access_token: string;
}
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface AllUsers extends Omit<User, 'password'> {}

export interface Profile extends Omit<User, 'password'> {}
