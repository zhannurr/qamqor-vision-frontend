import React from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  Platform,
  ScrollView,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export interface ModalProps {
  /** Modal visibility */
  visible: boolean;
  /** Callback when modal is dismissed */
  onDismiss?: () => void;
  /** Modal title */
  title?: string;
  /** Modal subtitle */
  subtitle?: string;
  /** Icon name from MaterialCommunityIcons */
  icon?: string;
  /** Icon color */
  iconColor?: string;
  /** Icon background color */
  iconBackgroundColor?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Footer/Actions content */
  actions?: React.ReactNode;
  /** Additional styles for modal container */
  containerStyle?: any;
  /** Style for content wrapper */
  contentStyle?: any;
  /** Style for footer/actions */
  actionsStyle?: any;
  /** Whether modal can be dismissed by tapping outside */
  dismissable?: boolean;
  /** Maximum height of the modal content */
  maxContentHeight?: number;
  /** Width of the modal (default: 580 on desktop, screen width - 40 on mobile) */
  width?: number;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Test ID for testing */
  testID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  title,
  subtitle,
  icon,
  iconColor = '#8B7A9E',
  iconBackgroundColor = '#E8E0F0',
  children,
  actions,
  containerStyle,
  contentStyle,
  actionsStyle,
  dismissable = true,
  maxContentHeight = 500,
  width,
  showCloseButton = true,
  testID,
}) => {
  const { width: windowWidth } = useWindowDimensions();

  // Calculate responsive width
  const calculatedWidth = width
    ? width
    : windowWidth > 600
      ? 580
      : windowWidth - 40;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={dismissable ? onDismiss : undefined}
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={dismissable ? onDismiss : undefined}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Surface
              style={[
                styles.modalContainer,
                { width: calculatedWidth },
                containerStyle,
              ]}
              elevation={5}
            >
              {/* Header */}
              {(title || subtitle || icon) && (
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    {icon && (
                      <View
                        style={[
                          styles.iconContainer,
                          { backgroundColor: iconBackgroundColor },
                        ]}
                      >
                        <Icon name={icon} size={24} color={iconColor} />
                      </View>
                    )}
                    <View style={styles.headerText}>
                      {title && <Text style={styles.title}>{title}</Text>}
                      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                  </View>
                  {showCloseButton && onDismiss && (
                    <TouchableOpacity
                      onPress={onDismiss}
                      style={styles.closeButton}
                      testID="modal-close-button"
                    >
                      <Icon name="close" size={24} color="#717182" />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <ScrollView
                style={[
                  styles.content,
                  { maxHeight: maxContentHeight },
                  contentStyle,
                ]}
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>

              {/* Footer/Actions */}
              {actions && (
                <View style={[styles.footer, actionsStyle]}>{actions}</View>
              )}
            </Surface>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#717182',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    gap: 12,
  },
});
