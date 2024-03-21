import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import Loader from '../component/Loader';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {NavigationContainer} from '@react-navigation/native';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return <NavigationContainer>{userToken == null ? <AuthStack /> : <AppStack />}</NavigationContainer>;
};

export default AppNav;
