import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  style,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`button_${size}`],
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.buttonPrimary };
      case 'secondary':
        return { ...baseStyle, ...styles.buttonSecondary };
      case 'outline':
        return { ...baseStyle, ...styles.buttonOutline };
      case 'text':
        return { ...baseStyle, ...styles.buttonText };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonLabel,
      ...styles[`buttonLabel_${size}`],
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, ...styles.buttonLabelPrimary };
      case 'secondary':
        return { ...baseStyle, ...styles.buttonLabelSecondary };
      case 'outline':
        return { ...baseStyle, ...styles.buttonLabelOutline };
      case 'text':
        return { ...baseStyle, ...styles.buttonLabelText };
      default:
        return baseStyle;
    }
  };

  const getIconColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
      case 'text':
        return '#A89AB8';
      default:
        return '#FFFFFF';
    }
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 18;
      case 'large':
        return 20;
      default:
        return 18;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && iconPosition === 'left' && (
        <MaterialCommunityIcons
          name={icon}
          size={getIconSize()}
          color={getIconColor()}
          style={styles.iconLeft}
        />
      )}
      <Text style={getTextStyle()}>{label}</Text>
      {icon && iconPosition === 'right' && (
        <MaterialCommunityIcons
          name={icon}
          size={getIconSize()}
          color={getIconColor()}
          style={styles.iconRight}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  button_small: {
    height: 36,
    paddingHorizontal: 16,
  },
  button_medium: {
    height: 48,
    paddingHorizontal: 20,
  },
  button_large: {
    height: 56,
    paddingHorizontal: 24,
  },
  buttonPrimary: {
    backgroundColor: '#A89AB8',
  },
  buttonSecondary: {
    backgroundColor: '#8B7A9E',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#A89AB8',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    fontWeight: '600',
  },
  buttonLabel_small: {
    fontSize: 13,
  },
  buttonLabel_medium: {
    fontSize: 15,
  },
  buttonLabel_large: {
    fontSize: 16,
  },
  buttonLabelPrimary: {
    color: '#FFFFFF',
  },
  buttonLabelSecondary: {
    color: '#FFFFFF',
  },
  buttonLabelOutline: {
    color: '#A89AB8',
  },
  buttonLabelText: {
    color: '#A89AB8',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
