import { createContext, useState } from 'react';

type AuthCtx = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthCtx>({
    token: '',
    setToken: () => {},
});

AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<any> = ({ children }: any) => {
    const [token, setToken] = useState('');

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
