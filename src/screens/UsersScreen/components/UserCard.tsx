import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User, roleColors, roleDisplayNames } from '../types/user.types';

interface UserCardProps {
  user: User;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onPress,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (isVerified: boolean) => {
    return isVerified ? '#4CAF50' : '#FFA726';
  };

  const getStatusText = (isVerified: boolean) => {
    return isVerified ? 'Активен' : 'Ожидает активации';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface style={styles.card} elevation={1}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account-circle" size={40} color="#A89AB8" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>РОЛЬ</Text>
              <View style={[styles.roleBadge, { backgroundColor: roleColors[user.role] || '#9E9E9E' }]}>
                <Text style={styles.roleText}>{roleDisplayNames[user.role] || user.role}</Text>
              </View>
            </View>
          </View>

          {user.organization_name && (
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ОРГАНИЗАЦИЯ</Text>
                <Text style={styles.infoValue}>{user.organization_name}</Text>
              </View>
            </View>
          )}

          {user.institution_name && (
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>УЧРЕЖДЕНИЕ</Text>
                <Text style={styles.infoValue}>{user.institution_name}</Text>
              </View>
            </View>
          )}

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>СТАТУС</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(user.is_verified) }]}>
                <Text style={styles.statusText}>{getStatusText(user.is_verified)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ДАТА РЕГИСТРАЦИИ</Text>
              <Text style={styles.infoValue}>
                {new Date(user.created_at).toLocaleDateString('ru-RU')}
              </Text>
            </View>
          </View>

          {user.last_login && (
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ПОСЛЕДНИЙ ВХОД</Text>
                <Text style={styles.infoValue}>
                  {new Date(user.last_login).toLocaleString('ru-RU')}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="pencil" size={18} color="#A89AB8" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="delete" size={18} color="#EF5350" />
          </TouchableOpacity>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#717182',
  },
  cardBody: {
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9E9E9E',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '500',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
