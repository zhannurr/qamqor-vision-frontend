import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

// Маппинг fontWeight на названия шрифтов Plus Jakarta Sans
const getFontFamily = (weight?: string | number): string => {
  const weightStr = String(weight || '400');
  
  switch (weightStr) {
    case '100':
    case '200':
      return 'Montserrat-ExtraLight';
    case '300':
      return 'Montserrat-Light';
    case '400':
    case 'normal':
      return 'Montserrat-Regular';
    case '500':
      return 'Montserrat-Medium';
    case '600':
      return 'Montserrat-SemiBold';
    case '700':
    case 'bold':
      return 'Montserrat-Bold';
    case '800':
    case '900':
      return 'Montserrat-ExtraBold';
    default:
      return 'Montserrat-Regular';
  }
};

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
  // Извлекаем fontWeight из style
  const styleArray = Array.isArray(style) ? style : [style];
  const flatStyle = StyleSheet.flatten(styleArray);
  const fontWeight = flatStyle?.fontWeight;
  
  // Добавляем fontFamily на основе fontWeight
  const fontFamily = getFontFamily(fontWeight);
  
  return (
    <RNText
      {...props}
      style={[
        { fontFamily },
        style,
      ]}
    />
  );
};
