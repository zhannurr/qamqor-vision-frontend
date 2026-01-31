import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Surface style={styles.content} elevation={1}>
        <Icon name="bell-outline" size={80} color="#A89AB8" />
        <Text style={styles.title}>Уведомления</Text>
        <Text style={styles.subtitle}>Центр уведомлений в разработке</Text>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    padding: 40,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1B1B',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#717182',
    marginTop: 8,
  },
});

export default NotificationsScreen;
