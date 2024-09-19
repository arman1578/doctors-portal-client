import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import {createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext ();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);


    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }

    const createUser = ( email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
    const signIn = ( email, password ) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }
     
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])
     

    const authInfo = {
        createUser
        ,signIn
        ,updateUserProfile
        ,logout
        ,user
        ,loading
        ,providerLogin
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;