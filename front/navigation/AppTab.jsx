import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dashboard from '../screen/Dashboard';
import ViewAnnouncements from '../screen/announcement/ViewAnnouncements';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import ScanQR from '../screen/ScanQR';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const {userInfo} = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {paddingBottom: 5},
        tabBarActiveTintColor: 'rgb(255, 108, 222)',
        tabBarInactiveTintColor: 'gray',

        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          if (route.name === 'Dashboard') {
            iconName = 'clipboard';
          } else if (route.name === 'ViewAnnouncements') {
            iconName = 'reader';
          } else if (route.name === 'ScanQR') {
            iconName = 'qr-code';
          }
          iconName += focused ? '' : '-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{title: 'Tableau de bord'}} />
      {userInfo.roles.includes('shop') && (
        <Tab.Screen name="ScanQR" component={ScanQR} options={{title: 'Scan QR Code'}} />
      )}
      {userInfo.roles.includes('influencer') && (
        <Tab.Screen name="ViewAnnouncements" component={ViewAnnouncements} options={{title: 'Voir les Annonces'}} />
      )}
    </Tab.Navigator>
  );
};

export default AppTab;
