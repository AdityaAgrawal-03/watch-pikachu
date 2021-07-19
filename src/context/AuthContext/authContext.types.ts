export type AuthContextTypes = {
  token: string | null;
  loginUser: LoginUser;
  signupUser: SignupUser;
  logout: () => void
};

export type LoginUser = (email: string, password: string) => Promise<any>;
export type SignupUser = (username: string, email: string, password: string) => Promise<any>;


