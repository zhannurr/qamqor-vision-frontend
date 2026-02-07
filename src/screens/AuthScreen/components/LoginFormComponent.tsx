import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useLoginForm } from '../hooks/useLoginForm';

interface LoginFormProps {
  onNavigateToRegister?: () => void;
}

export const LoginFormComponent: React.FC<LoginFormProps> = ({ onNavigateToRegister }) => {
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Вход</Text>

      <TextInput
        label="Email адрес"
        placeholder="your.email@example.com"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        disabled={isSubmitting}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
        error={!!errors.email}
        style={styles.input}
        outlineColor={errors.email ? '#d4183d' : '#E6E6E6'}
        activeOutlineColor={errors.email ? '#d4183d' : '#A89AB8'}
        left={<TextInput.Icon icon="email-outline" color="#717182" />}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Пароль"
        placeholder="Введите ваш пароль"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        disabled={isSubmitting}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        mode="outlined"
        error={!!errors.password}
        style={styles.input}
        outlineColor={errors.password ? '#d4183d' : '#E6E6E6'}
        activeOutlineColor={errors.password ? '#d4183d' : '#A89AB8'}
        left={<TextInput.Icon icon="lock-outline" color="#717182" />}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisibility}
            color="#717182"
          />
        }
      />
      {errors.password && <HelperText type="error">{errors.password}</HelperText>}

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
        style={styles.submitButton}
        contentStyle={{ height: 48 }}
        icon={!isSubmitting ? 'arrow-right' : undefined}
      >
        {isSubmitting ? 'Отправка...' : 'Войти'}
      </Button>

      <View style={styles.footerLinks}>
        <Button mode="text" compact labelStyle={styles.linkText}>
          Забыли пароль?
        </Button>
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Нет аккаунта? </Text>
          <TouchableOpacity onPress={onNavigateToRegister} disabled={isSubmitting}>
            <Text style={styles.registerLink}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1B1B1B',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    borderRadius: 16,
    backgroundColor: '#1B1B1B',
    marginTop: 8,
  },
  footerLinks: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#A89AB8',
    fontSize: 14,
  },
  signupRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  registerLink: {
    fontSize: 14,
    color: '#A89AB8',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
