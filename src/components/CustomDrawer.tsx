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
import { useAuth } from '../contexts/AuthContext';
import { LogoutConfirmationDialog } from './LogoutConfirmationDialog';

interface DrawerItemProps {
  label: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
}

type IconName = React.ComponentProps<typeof Icon>['name'];

const DrawerItem: React.FC<DrawerItemProps> = ({ label, icon, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.drawerItem, isActive && styles.drawerItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon
        name={icon as IconName}
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
  const { logout, user } = useAuth();
  const currentRoute = state.routes[state.index].name;
  const [logoutDialogVisible, setLogoutDialogVisible] = React.useState(false);

  const handleLogoutPress = () => {
    setLogoutDialogVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCancelLogout = () => {
    setLogoutDialogVisible(false);
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

        {/* User Info */}
        {user && (
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Icon name="account-circle" size={40} color="#8B7A9E" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.full_name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userRole}>{user.role === 'manager' ? 'Менеджер' : user.role}</Text>
            </View>
          </View>
        )}

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
          onPress={handleLogoutPress}
          activeOpacity={0.7}
        >
          <Icon name="logout" size={22} color="#717182" style={styles.drawerIcon} />
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        visible={logoutDialogVisible}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#F9F8FB',
    borderRadius: 12,
  },
  userAvatar: {
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#717182',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 11,
    color: '#8B7A9E',
    fontWeight: '500',
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
