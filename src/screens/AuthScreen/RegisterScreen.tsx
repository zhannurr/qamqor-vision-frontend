import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Surface } from 'react-native-paper';
import { AuthBrand } from './components/AuthBrand';
import { RegisterFormComponent } from './components/RegisterFormComponent';
import { useRegisterForm } from './hooks/useRegisterForm';
import CustomSnackbar from '../../components/CustomSnackbar';

const { height, width } = Dimensions.get('window');

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin }) => {
  const { snackbar, dismissSnackbar } = useRegisterForm();

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
            {/* Left Panel - Brand */}
            <AuthBrand />

            {/* Right Panel - Register Form */}
            <View style={styles.rightPanel}>
              <RegisterFormComponent onNavigateToLogin={onNavigateToLogin} />
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      < CustomSnackbar
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
  rightPanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default RegisterScreen;
