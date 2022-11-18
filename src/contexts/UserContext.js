import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const UserContext = createContext();

const auth = getAuth(app);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [tokenReceived, setTokenReceived] = useState(false);
  // const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  // const [ token ] = useGetToken(loggedInUserEmail);

  // if (token) {
  //   setTokenReceived(true);
  // }

  const googleSignInProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleSignInProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUserInfo = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo)
  }

  const logOutUser = () => {
    setLoading(true);
    localStorage.removeItem("accessToken")
    return signOut(auth);
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      // setLoggedInUserEmail(currentUser.email)
      setUser(currentUser);
      setLoading(false);
    })

    return () => unsubscribe();
  }, [])

  const authInfo = {
    googleSignIn,
    createUser,
    logInUser,
    logOutUser,
    updateUserInfo,
    resetPassword,
    user,
    loading,
    // tokenReceived
  }

  return (
    <UserContext.Provider value={authInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;