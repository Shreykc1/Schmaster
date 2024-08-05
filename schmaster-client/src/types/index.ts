export type INewUser = {
  email : string,
  password: string
  };


  export type IUser = {
    id: string;
    // name: string,
    email: string,
  };

  export type IContextType = {
    user: IUser,
    isLoading: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}