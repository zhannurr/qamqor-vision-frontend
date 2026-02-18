import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Modal } from '../../../components/UI/Modal';
import { CustomButton } from '../../../components/UI/CustomButton';
import { forgotPassword } from '../../../api/auth';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  onSuccess,
  onError,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError('Email обязателен');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Некорректный email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgotPassword(email);

      if (response.data) {
        onSuccess?.(response.data.message || 'Инструкции отправлены на ваш email');
        handleClose();
      } else if (response.error) {
        onError?.(response.error.message || 'Не удалось отправить инструкции');
      }
    } catch (error) {
      onError?.('Произошла ошибка при отправке запроса');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      title="Восстановление пароля"
      subtitle="Введите ваш email для получения инструкций"
      icon="lock-reset"
      iconColor="#8B7A9E"
      iconBackgroundColor="#E8E0F0"
      dismissable={true}
      showCloseButton={true}
      width={480}
      actions={
        <>
          <CustomButton
            label="Отменить"
            onPress={handleClose}
            variant="outline"
            disabled={isSubmitting}
          />
          <CustomButton
            label={isSubmitting ? 'Отправка...' : 'Отправить'}
            onPress={handleSubmit}
            variant="primary"
            disabled={isSubmitting}
          />
        </>
      }
    >
      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            mode="outlined"
            placeholder="Введите ваш email"
            placeholderTextColor="#9E9E9E"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            style={styles.input}
            outlineColor={emailError ? '#EF5350' : '#E0E0E0'}
            activeOutlineColor={emailError ? '#EF5350' : '#A89AB8'}
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={isSubmitting}
            error={!!emailError}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="email-outline" size={20} color="#717182" />
                )}
              />
            }
          />
          {emailError && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Icon name="information-outline" size={20} color="#2196F3" />
          <Text style={styles.infoText}>
            Мы отправим инструкции по восстановлению пароля на указанный email адрес.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 24,
  },
  formGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    color: '#EF5350',
    marginTop: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 18,
  },
});
