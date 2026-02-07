// App.tsx
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { theme } from "./src/theme";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import LoginForm from "./src/screens/LoginForm";
import RegisterForm from "./src/screens/RegisterForm";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A89AB8" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {showRegister ? (
          <RegisterForm onNavigateToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onNavigateToRegister={() => setShowRegister(true)} />
        )}
      </>
    );
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;