// components/CustomSnackbar.tsx
import React from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

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
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.primary;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.surface;
    }
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={{ backgroundColor: getBackgroundColor() }}
      action={{
        label: 'OK',
        onPress: onDismiss,
      }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;