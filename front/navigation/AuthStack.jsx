import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import Register from '../screen/Register/Register';
import Login from '../screen/Login';
import Dashboard from '../screen/Dashboard';
import ResetPassword from '../screen/forgetPassword/ResetPassword';
import NewPassword from '../screen/forgetPassword/NewPassword';
import Code from '../screen/forgetPassword/Code';
import RegisterStepTwo from '../screen/Register/RegisterStepTwo';
import RegisterStepThree from '../screen/Register/RegisterStepThree';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Accueil'}} />
      <Stack.Screen name="Login" component={Login} options={{title: 'Connexion'}} />
      <Stack.Screen name="Register" component={Register} options={{title: 'Inscription'}} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title: 'Nouveau mot de passe'}} />
      <Stack.Screen name="NewPassword" component={NewPassword} options={{title: 'Nouveau mot de passe'}} />
      <Stack.Screen name="Code" component={Code} options={{title: 'Nouveau mot de passe'}} />
      <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwo} options={{title: 'Inscription - Etape 2'}} />
      <Stack.Screen name="RegisterStepThree" component={RegisterStepThree} options={{title: 'Inscription - Etape 3'}} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Tableau de bord'}} />
    </Stack.Navigator>
  );
};

export default AuthStack;
