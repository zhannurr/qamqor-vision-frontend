import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { CustomButton } from './UI/CustomButton';
import { Modal } from './UI/Modal';

interface LogoutConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmationDialog: React.FC<LogoutConfirmationDialogProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      title="Выход из системы"
      subtitle="Вы уверены?"
      icon="logout"
      iconColor="#8B7A9E"
      iconBackgroundColor="#E8E0F0"
      dismissable={true}
      showCloseButton={true}
      maxContentHeight={150}
      width={420}
      actions={
        <>
          <CustomButton
            label="Отменить"
            onPress={onClose}
            variant="outline"
          />
          <CustomButton
            label="Выйти"
            onPress={handleConfirm}
            variant="primary"
          />
        </>
      }
    >
      <View style={styles.content}>
        <Text style={styles.message}>
          Вы действительно хотите выйти из системы?
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8,
  },
  message: {
    fontSize: 15,
    color: '#1B1B1B',
    lineHeight: 22,
    textAlign: 'center',
  },
});
