import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
import jwtDecode from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);


  const loginContext = data => {
    setIsLoading(true);
    setUserToken(data.token);
    setUserInfo(data.user);
    setUserData(data.userData)
    AsyncStorage.setItem('userToken', data.token);
    AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    AsyncStorage.setItem('userData', JSON.stringify(data.userData));
    setIsLoading(false);
  };

  const logoutContext = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserData(null)
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userData');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      const userInfo = await AsyncStorage.getItem('userInfo');
      const userData = await AsyncStorage.getItem('userData');
      const currentTime = Math.floor(Date.now() / 1000);

      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        if (decodedToken.exp < currentTime) {
          logoutContext();
        } else {
          setUserToken(userToken);
          setUserData(JSON.parse(userData))
          setUserInfo(JSON.parse(userInfo));
        }
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loginContext, logoutContext, userToken, isLoading, userInfo, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
