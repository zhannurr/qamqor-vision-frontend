import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, HelperText, Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useRegisterForm } from '../hooks/useRegisterForm';

interface RegisterFormProps {
  onNavigateToLogin: () => void;
}

export const RegisterFormComponent: React.FC<RegisterFormProps> = ({ onNavigateToLogin }) => {
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    registrationSuccess,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegisterForm();

  // Auto navigate to login after successful registration
  React.useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        onNavigateToLogin();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, onNavigateToLogin]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.formTitle}>Создать аккаунт</Text>
      <Text style={styles.subtitle}>Заполните форму для регистрации в системе</Text>

      {errors.general && (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={20} color="#C73E3E" />
          <Text style={styles.errorText}>{errors.general}</Text>
        </View>
      )}

      {/* First Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Имя</Text>
        <TextInput
          mode="outlined"
          placeholder="Введите ваше имя"
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          error={!!errors.firstName}
          disabled={isSubmitting}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="account" size={20} color="#717182" />} />}
        />
        {errors.firstName && <HelperText type="error">{errors.firstName}</HelperText>}
      </View>

      {/* Last Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Фамилия</Text>
        <TextInput
          mode="outlined"
          placeholder="Введите вашу фамилию"
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          error={!!errors.lastName}
          disabled={isSubmitting}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="account" size={20} color="#717182" />} />}
        />
        {errors.lastName && <HelperText type="error">{errors.lastName}</HelperText>}
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          mode="outlined"
          placeholder="example@email.com"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          error={!!errors.email}
          disabled={isSubmitting}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="email" size={20} color="#717182" />} />}
        />
        {errors.email && <HelperText type="error">{errors.email}</HelperText>}
      </View>

      {/* Phone Number */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Телефон (необязательно)</Text>
        <TextInput
          mode="outlined"
          placeholder="+7 (777) 123-45-67"
          value={formData.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
          error={!!errors.phoneNumber}
          disabled={isSubmitting}
          keyboardType="phone-pad"
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="phone" size={20} color="#717182" />} />}
        />
        {errors.phoneNumber && <HelperText type="error">{errors.phoneNumber}</HelperText>}
      </View>

      {/* Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Пароль</Text>
        <TextInput
          mode="outlined"
          placeholder="Введите пароль"
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          error={!!errors.password}
          disabled={isSubmitting}
          secureTextEntry={!showPassword}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="lock" size={20} color="#717182" />} />}
          right={
            <TextInput.Icon
              icon={() => <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#717182" />}
              onPress={togglePasswordVisibility}
            />
          }
        />
        {errors.password && <HelperText type="error">{errors.password}</HelperText>}
      </View>

      {/* Confirm Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Подтвердите пароль</Text>
        <TextInput
          mode="outlined"
          placeholder="Повторите пароль"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          error={!!errors.confirmPassword}
          disabled={isSubmitting}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          left={<TextInput.Icon icon={() => <Icon name="lock-check" size={20} color="#717182" />} />}
          right={
            <TextInput.Icon
              icon={() => <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#717182" />}
              onPress={toggleConfirmPasswordVisibility}
            />
          }
        />
        {errors.confirmPassword && <HelperText type="error">{errors.confirmPassword}</HelperText>}
      </View>

      {/* Push Notifications */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={formData.pushNotificationPermission ? 'checked' : 'unchecked'}
          onPress={() => handleChange('pushNotificationPermission', !formData.pushNotificationPermission)}
          color="#A89AB8"
        />
        <Text style={styles.checkboxLabel}>Разрешить push-уведомления</Text>
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
        style={styles.submitButton}
        labelStyle={styles.submitButtonText}
        buttonColor="#1B1B1B"
        contentStyle={{ height: 48 }}
      >
        Зарегистрироваться
      </Button>

      {/* Login Link */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginLinkText}>Уже есть аккаунт? </Text>
        <TouchableOpacity onPress={onNavigateToLogin} disabled={isSubmitting}>
          <Text style={styles.loginLink}>Войти</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#717182',
    lineHeight: 20,
    marginBottom: 24,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#C73E3E',
  },
  inputGroup: {
    marginBottom: 20,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#1B1B1B',
    marginLeft: 8,
  },
  submitButton: {
    borderRadius: 16,
    marginBottom: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#717182',
  },
  loginLink: {
    fontSize: 14,
    color: '#A89AB8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
