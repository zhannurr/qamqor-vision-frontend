import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Button, Surface, HelperText, Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import CustomSnackbar from '../components/CustomSnackbar';
import { useRegisterForm } from '../hooks/useRegisterForm';

const { height, width } = Dimensions.get('window');

interface RegisterFormProps {
  onNavigateToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onNavigateToLogin }) => {
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    snackbar,
    registrationSuccess,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    dismissSnackbar,
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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#E8E0F0" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Surface style={styles.authCard} elevation={5}>
            {/* Left Panel */}
            <ImageBackground 
              source={require('../../assets/hero-image.png')}
              resizeMode="cover"
              style={styles.backgroundImage}
            >
              <View style={styles.leftPanel}>
                <View style={styles.logoSection}>
                  <View style={styles.iconContainer}>
                    <Icon name="eye" size={48} color="#8B7A9E" />
                  </View>
                  <Text style={styles.brandTitle}>Qamqor Vision</Text>
                  <Text style={styles.brandSubtitle}>Intelligent Monitoring System</Text>
                </View>
                
                <View style={styles.featuresSection}>
                  <View style={styles.featureItem}>
                    <Icon name="shield-check" size={24} color="#8B7A9E" />
                    <Text style={styles.featureText}>Безопасная регистрация</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Icon name="email-check" size={24} color="#8B7A9E" />
                    <Text style={styles.featureText}>Подтверждение email</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Icon name="account-check" size={24} color="#8B7A9E" />
                    <Text style={styles.featureText}>Персональный аккаунт</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>

            {/* Right Panel - Register Form */}
            <View style={styles.rightPanel}>
              <ScrollView 
                style={styles.formScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.formHeader}>
                  <Text style={styles.welcomeText}>Создать аккаунт</Text>
                  <Text style={styles.instructionText}>
                    Заполните форму для регистрации в системе
                  </Text>
                </View>

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
                  {errors.firstName && (
                    <HelperText type="error" visible={!!errors.firstName}>
                      {errors.firstName}
                    </HelperText>
                  )}
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
                  {errors.lastName && (
                    <HelperText type="error" visible={!!errors.lastName}>
                      {errors.lastName}
                    </HelperText>
                  )}
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
                  {errors.email && (
                    <HelperText type="error" visible={!!errors.email}>
                      {errors.email}
                    </HelperText>
                  )}
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
                  {errors.phoneNumber && (
                    <HelperText type="error" visible={!!errors.phoneNumber}>
                      {errors.phoneNumber}
                    </HelperText>
                  )}
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
                        icon={() => (
                          <Icon
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="#717182"
                          />
                        )}
                        onPress={togglePasswordVisibility}
                      />
                    }
                  />
                  {errors.password && (
                    <HelperText type="error" visible={!!errors.password}>
                      {errors.password}
                    </HelperText>
                  )}
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
                        icon={() => (
                          <Icon
                            name={showConfirmPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color="#717182"
                          />
                        )}
                        onPress={toggleConfirmPasswordVisibility}
                      />
                    }
                  />
                  {errors.confirmPassword && (
                    <HelperText type="error" visible={!!errors.confirmPassword}>
                      {errors.confirmPassword}
                    </HelperText>
                  )}
                </View>

                {/* Push Notifications */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={formData.pushNotificationPermission ? 'checked' : 'unchecked'}
                    onPress={() => handleChange('pushNotificationPermission', !formData.pushNotificationPermission)}
                    color="#A89AB8"
                  />
                  <Text style={styles.checkboxLabel}>
                    Разрешить push-уведомления
                  </Text>
                </View>

                {/* Submit Button */}
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.submitButton}
                  labelStyle={styles.submitButtonText}
                  buttonColor="#A89AB8"
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
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={dismissSnackbar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E0F0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    minHeight: height,
  },
  authCard: {
    flexDirection: 'row',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    minHeight: height * 0.85,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  leftPanel: {
    flex: 1,
    padding: 48,
    backgroundColor: 'rgba(232, 224, 240, 0.95)',
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#717182',
    textAlign: 'center',
  },
  featuresSection: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#1B1B1B',
    fontWeight: '500',
  },
  rightPanel: {
    flex: 1.2,
    padding: 48,
  },
  formScroll: {
    flex: 1,
  },
  formHeader: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#717182',
    lineHeight: 20,
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
    height: 48,
    justifyContent: 'center',
    borderRadius: 12,
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
  },
});

export default RegisterForm;
