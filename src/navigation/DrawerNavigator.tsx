import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from '../components/CustomDrawer';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import CamerasScreen from '../screens/CamerasScreen';
import LiveMonitoringScreen from '../screens/LiveMonitoringScreen';
import IncidentsScreen from '../screens/IncidentsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import UsersScreen from '../screens/UsersScreen/UsersScreen';
import InstitutionsScreen from '../screens/InstitutionsScreen';
import InstitutionDetailsScreen from '../screens/InstitutionsScreen/InstitutionDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Institution } from '../screens/InstitutionsScreen/types/institution.types';

export type InstitutionsStackParamList = {
  InstitutionsList: undefined;
  InstitutionDetails: { institution: Institution };
};

export type DrawerParamList = {
  Dashboard: undefined;
  Cameras: undefined;
  LiveMonitoring: undefined;
  Incidents: undefined;
  Notifications: undefined;
  Analytics: undefined;
  Users: undefined;
  InstitutionsStack: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const InstitutionsStack = createNativeStackNavigator<InstitutionsStackParamList>();

const InstitutionsNavigator: React.FC = () => {
  return (
    <InstitutionsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InstitutionsStack.Screen
        name="InstitutionsList"
        component={InstitutionsScreen}
      />
      <InstitutionsStack.Screen
        name="InstitutionDetails"
        component={InstitutionDetailsScreen}
      />
    </InstitutionsStack.Navigator>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerTintColor: '#1B1B1B',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        drawerStyle: {
          width: 280,
        },
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="Cameras"
        component={CamerasScreen}
        options={{ title: 'Камеры' }}
      />
      <Drawer.Screen
        name="LiveMonitoring"
        component={LiveMonitoringScreen}
        options={{ title: 'Live мониторинг' }}
      />
      <Drawer.Screen
        name="Incidents"
        component={IncidentsScreen}
        options={{ title: 'Инциденты' }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Уведомления' }}
      />
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: 'Аналитика' }}
      />
      <Drawer.Screen
        name="Users"
        component={UsersScreen}
        options={{ title: 'Пользователи' }}
      />
      <Drawer.Screen
        name="InstitutionsStack"
        component={InstitutionsNavigator}
        options={{ title: 'Учреждения' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Настройки' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
