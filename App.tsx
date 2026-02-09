// App.tsx
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { theme } from "./src/theme";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { LoginScreen, RegisterScreen } from "./src/screens/AuthScreen";
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
          <RegisterScreen onNavigateToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginScreen onNavigateToRegister={() => setShowRegister(true)} />
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
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/static/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/static/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/static/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./assets/fonts/static/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-Light': require('./assets/fonts/static/Montserrat-Light.ttf'),
    'Montserrat-ExtraLight': require('./assets/fonts/static/Montserrat-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A89AB8" />
      </View>
    );
  }

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