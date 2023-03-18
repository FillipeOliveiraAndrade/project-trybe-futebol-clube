export type ILogin = {
  type: number | null,
  message: string,
};

export interface ILoginService {
  userLogin(loginData: {
    email: string,
    password: string
  }): Promise<ILogin>

  loginRole(token: string): Promise<ILogin>;
}
