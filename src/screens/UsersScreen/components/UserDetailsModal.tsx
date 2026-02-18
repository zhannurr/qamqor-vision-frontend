import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Modal } from '../../../components/UI/Modal';
import { CustomButton } from '../../../components/UI/CustomButton';
import { roleDisplayNames, roleColors } from '../types/user.types';
import type { LoginHistoryEntry } from '../../../api/users';

interface UserDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  user: any | null;
  onEdit?: () => void;
  onBlock?: () => void;
  onDelete?: () => void;
  onGetUserDetails?: (userId: string) => Promise<{ user: any } | null>;
  onGetLoginHistory?: (userId: string, limit?: number, offset?: number) => Promise<{ login_history: LoginHistoryEntry[]; limit: number; offset: number } | null>;
}

const TAB_KEYS = {
  OPERATOR: 'operator',
  REMOVED: 'removed',
} as const;

const LOGIN_HISTORY_PAGE_SIZE = 10;

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  visible,
  onClose,
  user,
  onEdit,
  onBlock,
  onDelete,
  onGetUserDetails,
  onGetLoginHistory,
}) => {
  const [activeTab, setActiveTab] = useState<string>(TAB_KEYS.OPERATOR);
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (visible && user?.id && onGetLoginHistory) {
      loadLoginHistory();
    } else if (!visible) {
      setLoginHistory([]);
    }
  }, [visible, user?.id]);

  const loadLoginHistory = async () => {
    if (!user?.id || !onGetLoginHistory) return;
    setLoadingHistory(true);
    try {
      const result = await onGetLoginHistory(user.id, LOGIN_HISTORY_PAGE_SIZE, 0);
      if (result?.login_history) {
        setLoginHistory(result.login_history);
      } else {
        setLoginHistory([]);
      }
    } catch (error) {
      console.error('Error loading login history:', error);
      setLoginHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  if (!user) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Нет данных';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Нет данных';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      title={`${user.first_name} ${user.last_name}`}
      subtitle={user.email}
      icon="account-outline"
      iconColor="#8B7A9E"
      iconBackgroundColor="#E8E0F0"
      dismissable={true}
      showCloseButton={true}
      maxContentHeight={600}
      width={720}
    >


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Two column layout for personal and work info */}
        <View style={styles.twoColumnContainer}>
          {/* Личные данные */}
          <View style={styles.columnSection}>
            <Text style={styles.sectionTitle}>Личные данные</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <View style={styles.infoLabelRow}>
                  <Icon name="account-outline" size={16} color="#717182" />
                  <Text style={styles.infoLabel}>Имя</Text>
                </View>
                <Text style={styles.infoValue}>{user.first_name}</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoLabelRow}>
                  <Icon name="account-outline" size={16} color="#717182" />
                  <Text style={styles.infoLabel}>Фамилия</Text>
                </View>
                <Text style={styles.infoValue}>{user.last_name}</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoLabelRow}>
                  <Icon name="email-outline" size={16} color="#717182" />
                  <Text style={styles.infoLabel}>Email</Text>
                </View>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoLabelRow}>
                  <Icon name="phone-outline" size={16} color="#717182" />
                  <Text style={styles.infoLabel}>Телефон</Text>
                </View>
                <Text style={styles.infoValue}>
                  {user.phone_number || 'Не указан'}
                </Text>
              </View>
            </View>
          </View>

          {/* Информация о работе */}
          <View style={styles.columnSection}>
            <Text style={styles.sectionTitle}>Информация о работе</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <View style={styles.infoLabelRow}>
                  <Icon name="briefcase-outline" size={16} color="#717182" />
                  <Text style={styles.infoLabel}>Роль</Text>
                </View>
                <Text style={styles.infoValue}>
                  {roleDisplayNames[user.role] || user.role}
                </Text>
              </View>

            </View>
          </View>
        </View>

        {/* Активность */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Активность</Text>
          <View style={styles.activityRow}>
            <View style={styles.activityItem}>
              <View style={styles.infoLabelRow}>
                <Icon name="calendar-clock" size={16} color="#717182" />
                <Text style={styles.infoLabel}>Дата регистрации</Text>
              </View>
              <Text style={styles.infoValue}>{formatDate(user.created_at)}</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.infoLabelRow}>
                <Icon name="login" size={16} color="#717182" />
                <Text style={styles.infoLabel}>Последний вход</Text>
              </View>
              <Text style={styles.infoValue}>
                {loginHistory.length > 0
                  ? formatDateTime(loginHistory[0].created_at)
                  : user.last_login
                  ? formatDateTime(user.last_login)
                  : 'Не входил'}
              </Text>
            </View>
          </View>
        </View>

        {/* История входов */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>История входов</Text>
          {loadingHistory ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#A89AB8" />
            </View>
          ) : loginHistory.length > 0 ? (
            loginHistory.map((login) => {
              const isSuccess = login.login_status?.toLowerCase() === 'success';
              return (
                <View key={login.id} style={styles.loginHistoryItem}>
                  <View style={[styles.loginHistoryIcon, !isSuccess && styles.loginHistoryIconFailed]}>
                    <Icon
                      name={isSuccess ? 'check-circle' : 'close-circle'}
                      size={20}
                      color={isSuccess ? '#4CAF50' : '#E53935'}
                    />
                  </View>
                  <View style={styles.loginHistoryContent}>
                    <View style={styles.loginHistoryHeader}>
                      <Text style={styles.loginHistoryDate}>
                        {formatDateTime(login.created_at)}
                      </Text>
                      <View style={[styles.loginHistoryBadge, !isSuccess && styles.loginHistoryBadgeFailed]}>
                        <Text style={[styles.loginHistoryBadgeText, !isSuccess && styles.loginHistoryBadgeTextFailed]}>
                          {isSuccess ? 'Успешно' : 'Ошибка'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.loginHistoryInfo}>
                      {login.ip_address}
                      {login.user_agent ? ` • ${login.user_agent}` : ''}
                    </Text>
                    {!isSuccess && login.failure_reason ? (
                      <Text style={styles.loginHistoryFailure}>{login.failure_reason}</Text>
                    ) : null}
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.noDataText}>История входов пуста</Text>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingVertical: 16,
    marginBottom: 24,
  },
  statusBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  statusTabBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statusTabBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  columnSection: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 20,
  },
  infoItem: {
    gap: 8,
  },
  infoLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#717182',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '400',
  },
  activityRow: {
    flexDirection: 'row',
    gap: 24,
  },
  activityItem: {
    flex: 1,
    gap: 8,
  },
  loginHistoryItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  loginHistoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHistoryIconFailed: {
    backgroundColor: '#FFEBEE',
  },
  loginHistoryContent: {
    flex: 1,
    gap: 4,
  },
  loginHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginHistoryDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1B1B1B',
  },
  loginHistoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  loginHistoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },
  loginHistoryBadgeFailed: {
    backgroundColor: '#FFEBEE',
  },
  loginHistoryBadgeTextFailed: {
    color: '#E53935',
  },
  loginHistoryFailure: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 2,
  },
  loginHistoryInfo: {
    fontSize: 12,
    color: '#717182',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 13,
    color: '#717182',
    textAlign: 'center',
    padding: 20,
  },
});
