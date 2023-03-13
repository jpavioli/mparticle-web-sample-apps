// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from 'react';

interface User {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
}

interface UserDetailsStore {
    user: User | null;
    isLoggedIn: boolean;
    login(user: User): User;
    logout(): void;
}

// use type assertion for initial empty state
const UserDetails = createContext({} as UserDetailsStore);

export function useUserDetails() {
    const context = useContext(UserDetails);

    if (!context) {
        throw new Error(
            'useUserDetails must be used within a UserDetailsProvider',
        );
    }

    return context;
}

const UserDetailsProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const value = useMemo(() => {
        const login = (myUser: User) => {
            // In a real-world application, the user record would be pulled
            // from a database. In our Sample App, we are simply hard-coding
            // user details for demonstration purposes
            setUser(myUser);
            setLoggedIn(true);

            return myUser;
        };

        const logout = () => {
            setUser(null);
            setLoggedIn(false);
        };

        return {
            login,
            logout,
            user,
            isLoggedIn: loggedIn,
        };
    }, [user, loggedIn]);

    return (
        <UserDetails.Provider value={value}>{children}</UserDetails.Provider>
    );
};

export default UserDetailsProvider;
