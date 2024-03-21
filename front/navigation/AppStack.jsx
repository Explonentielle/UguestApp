import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewAnnouncement from '../screen/announcement/NewAnnouncement';
import AppTab from './AppTab';
import NewAnnouncementStepTwo from '../screen/announcement/NewAnnouncementStepTwo';
import ViewMyAnnouncements from '../screen/announcement/ViewMyAnnouncements';
import ViewAnnouncement from '../screen/announcement/ViewAnnouncement';
import ViewApplyAnnouncement from '../screen/announcement/viewAnnouncementApply';
import Profils from '../screen//Profils';
import Messaging from '../screen/Messaging';
import Statistics from '../screen/Statistics';
import Cart from '../screen/Cart';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppTab" component={AppTab} options={{headerShown: false}} />
      <Stack.Screen name="Cart" component={Cart} options={{title: 'Acheter des crédits'}} />

      <Stack.Screen name="NewAnnouncement" component={NewAnnouncement} options={{title: 'Nouvelle Annonce 1/2'}} />
      <Stack.Screen name="NewAnnouncementStepTwo" component={NewAnnouncementStepTwo} options={{title: 'Nouvelle Annonce 2/2'}}/>
      <Stack.Screen name="ViewMyAnnouncements" component={ViewMyAnnouncements} options={{title: 'Mes Annonces'}} />
      <Stack.Screen name="ViewAnnouncement" component={ViewAnnouncement} options={{title: 'Annonce'}} />
      <Stack.Screen name="Messaging" component={Messaging} options={{title: 'Messagerie'}} />
      <Stack.Screen name="ViewApplyAnnouncement" component={ViewApplyAnnouncement} options={{title: `Annonces auxquelles j'ai postulé`}} />
      <Stack.Screen name="Statistics" component={Statistics} options={{title: 'Statistiques'}} />
      <Stack.Screen name="Profil" component={Profils} options={{title: 'Mon Profil'}} />
    </Stack.Navigator>
  );
};

export default AppStack;
