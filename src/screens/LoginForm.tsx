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
} from 'react-native';
import { Text, TextInput, Button, Card, Surface, useTheme, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSnackbar from '../components/CustomSnackbar';
import { useLoginForm } from '../hooks/useLoginForm';

const { height, width } = Dimensions.get('window');

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    snackbar,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    dismissSnackbar,
  } = useLoginForm();

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
              <View style={styles.overlay} />
              <View style={styles.leftPanel}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.brandText}>Qamqor Vision</Text>
                <Text style={styles.tagline}>Your Eyes on Safety.</Text>
                <Text style={styles.description}>
                  Мы превращаем видеонаблюдение в интеллектуального помощника, {'\n'}
                  который понимает, где и когда может возникнуть опасность.
                </Text>
              </View>
            </ImageBackground>

            {/* Right Panel */}
            <View style={styles.rightPanel}>
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
                icon={!isSubmitting ? "arrow-right" : undefined}
              >
                {isSubmitting ? 'Отправка...' : 'Войти'}
              </Button>

              <View style={styles.footerLinks}>
                <Button mode="text" compact labelStyle={styles.linkText}>
                  Забыли пароль?
                </Button>
                <View style={styles.signupRow}>
                  <Text style={styles.signupText}>Нет аккаунта? </Text>
                  <Button mode="text" compact labelStyle={styles.linkText}>
                    Зарегистрироваться
                  </Button>
                </View>
              </View>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={dismissSnackbar}
        duration={4000}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBBBD8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  authCard: {
    width: width * 0.9,
    maxWidth: 1100,
    flexDirection: 'row',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
      width: '100%',
  height: '100%',
  justifyContent: 'center', // чтобы текст был по центру, можно менять
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 27, 27, 0.55)',
  },
  leftPanel: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  welcomeText: {
   color: '#FFFFFF',
  fontSize: 36,
  fontWeight: '700',
  marginBottom: 8,

  },
  brandText: {
    color: '#E8E0F0',
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 16,
    textShadowColor: '#fcf9fc', // цвет свечения
    textShadowOffset: { width: 0, height: 0 }, // смещение тени
    textShadowRadius: 6, // радиус размытия — чем больше, тем ярче свечет
  },
  tagline: {
    color: '#CBBBD8',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 26,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  signupText: {
    fontSize: 14,
    color: '#1B1B1B',
  },
});

export default LoginForm;
