import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';

export const AuthBrand: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../../../assets/hero-image.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.brandPanel}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandText}>Qamqor Vision</Text>
        <Text style={styles.tagline}>Your Eyes on Safety.</Text>
        <Text style={styles.description}>
          Мы превращаем видеонаблюдение в интеллектуального помощника,{'\n'}
          который понимает, где и когда может возникнуть опасность.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 27, 27, 0.55)',
  },
  brandPanel: {
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
    textShadowColor: '#fcf9fc',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
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
});
