import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IContextType, IUser } from '../types';
import { getCurrentUser } from '../lib/calls';

export const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    streak: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        setIsLoading(true);
        try {
            const token = Cookies.get('token');
            if (token) {
                const currentAccount = await getCurrentUser(token);
                if (currentAccount) {
                    setUser({
                        id: currentAccount.id,
                        email: currentAccount.email,
                        name: currentAccount.name,
                        streak: currentAccount.streaks,
                    });
                    setIsAuthenticated(true);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };
    const location = useLocation();
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');
            const isSignInPage = location.pathname === '/sign-in';
            const isSignUpPage = location.pathname === '/sign-up';
    
            if (!token && !isSignInPage && !isSignUpPage) {
                navigate('/sign-in');
            } else if (token) {
                await checkAuthUser();
            }
        };
        checkAuth();
    }, []);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
