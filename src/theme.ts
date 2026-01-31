// theme.ts
import { DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1B1B1B',
    accent: '#A89AB8',
    background: '#CBBBD8',
    surface: '#FFFFFF',
    text: '#1B1B1B',
    error: '#d4183d',
    placeholder: '#717182',
    backdrop: 'rgba(27, 27, 27, 0.5)',
  },
  roundness: 12,
};