import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import RdvListScreen from '../screens/Rdv/RdvListScreen';
import RdvCreateScreen from '../screens/Rdv/RdvCreateScreen';
import RdvDetailScreen from '../screens/Rdv/RdvDetailScreen';
import OrdonnanceList from '../screens/Ordonnance/OrdonnanceList';
import OrdonnanceDetail from '../screens/Ordonnance/OrdonnanceDetail';
import HistoriqueScreen from '../screens/HistoriqueScreen';
import RecusScreen from '../screens/RecusScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'LIFECARE 360' }} />
      <Stack.Screen name="RdvList" component={RdvListScreen} />
      <Stack.Screen name="RdvCreate" component={RdvCreateScreen} />
      <Stack.Screen name="RdvDetail" component={RdvDetailScreen} />
      <Stack.Screen name="OrdonnanceList" component={OrdonnanceList} />
      <Stack.Screen name="OrdonnanceDetail" component={OrdonnanceDetail} />
      <Stack.Screen name="Historique" component={HistoriqueScreen} />
      <Stack.Screen name="Recus" component={RecusScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
