// components/CustomSnackbar.tsx
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Portal } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface CustomSnackbarProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
}) => {
  const [opacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss();
      });
    }
  }, [visible, duration, onDismiss, opacity]);

  if (!visible) return null;

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          name: 'check' as const,
          backgroundColor: '#1BC43D',
        };
      case 'error':
        return {
          name: 'close' as const,
          backgroundColor: '#A02C0C',
        };
      default:
        return {
          name: 'information' as const,
          backgroundColor: '#2196F3',
        };
    }
  };

  const iconConfig = getIconConfig();

  return (
    <Portal>
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.snackbar}>
          <View style={[styles.iconContainer, { backgroundColor: iconConfig.backgroundColor }]}>
            <Icon name={iconConfig.name} size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 99999,
    elevation: 99999,
  },
  snackbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    maxWidth: 'fit-content',
    minWidth: 'auto',
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  message: {
    fontSize: 14,
    color: '#1B1B1B',
    fontWeight: '500',
    marginRight: 16,
  },
});

export default CustomSnackbar;