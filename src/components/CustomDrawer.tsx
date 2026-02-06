import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Divider } from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface DrawerItemProps {
  label: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, icon, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.drawerItem, isActive && styles.drawerItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon
        name={icon}
        size={22}
        color={isActive ? '#8B7A9E' : '#717182'}
        style={styles.drawerIcon}
      />
      <Text style={[styles.drawerLabel, isActive && styles.drawerLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;

  const handleLogout = () => {
    // Логика выхода из системы
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="eye" size={32} color="#8B7A9E" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.brandName}>Qamqor Vision</Text>
            <Text style={styles.brandTagline}>Intelligent Monitoring</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <DrawerItem
            label="Dashboard"
            icon="view-dashboard-outline"
            onPress={() => navigation.navigate('Dashboard')}
            isActive={currentRoute === 'Dashboard'}
          />
          <DrawerItem
            label="Камеры"
            icon="camera-outline"
            onPress={() => navigation.navigate('Cameras')}
            isActive={currentRoute === 'Cameras'}
          />
          <DrawerItem
            label="Live мониторинг"
            icon="play-circle-outline"
            onPress={() => navigation.navigate('LiveMonitoring')}
            isActive={currentRoute === 'LiveMonitoring'}
          />
          <DrawerItem
            label="Инциденты"
            icon="alert-outline"
            onPress={() => navigation.navigate('Incidents')}
            isActive={currentRoute === 'Incidents'}
          />
          <DrawerItem
            label="Уведомления"
            icon="bell-outline"
            onPress={() => navigation.navigate('Notifications')}
            isActive={currentRoute === 'Notifications'}
          />
          <DrawerItem
            label="Аналитика"
            icon="chart-bar"
            onPress={() => navigation.navigate('Analytics')}
            isActive={currentRoute === 'Analytics'}
          />
          <DrawerItem
            label="Пользователи"
            icon="account-group-outline"
            onPress={() => navigation.navigate('Users')}
            isActive={currentRoute === 'Users'}
          />
          <DrawerItem
            label="Учреждения"
            icon="office-building-outline"
            onPress={() => navigation.navigate('InstitutionsStack')}
            isActive={currentRoute === 'InstitutionsStack'}
          />
          <DrawerItem
            label="Настройки"
            icon="cog-outline"
            onPress={() => navigation.navigate('Settings')}
            isActive={currentRoute === 'Settings'}
          />
        </View>
      </DrawerContentScrollView>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Divider style={styles.divider} />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Icon name="logout" size={22} color="#717182" style={styles.drawerIcon} />
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerContent: {
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E8E0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  brandTagline: {
    fontSize: 13,
    color: '#A89AB8',
    marginTop: 2,
  },
  divider: {
    backgroundColor: '#F0F0F0',
    height: 1,
  },
  menuSection: {
    paddingTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  drawerItemActive: {
    backgroundColor: '#E8E0F0',
  },
  drawerIcon: {
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 15,
    color: '#717182',
    fontWeight: '500',
  },
  drawerLabelActive: {
    color: '#8B7A9E',
    fontWeight: '600',
  },
  logoutContainer: {
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 15,
    color: '#717182',
    fontWeight: '500',
  },
});

export default CustomDrawer;
