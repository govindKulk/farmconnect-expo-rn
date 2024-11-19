import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

import { IUser } from '@/types';

const AuthContext = createContext<{
    setAuth?: (user: IUser | null) => void;
    setUserData?: (user: any) => void;
    user: IUser | null;
}>({
    user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const setAuth = (authUser: IUser | null) => {
        setUser(authUser);
    };

    const setUserData = (userData: any) => {
        setUser((prev) => ({ ...prev, ...userData }));
    };

    return <AuthContext.Provider value={{ setAuth, setUserData, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
