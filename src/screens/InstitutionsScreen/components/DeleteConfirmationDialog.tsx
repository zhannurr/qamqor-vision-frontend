import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { CustomButton } from '../../../components/UI/CustomButton';
import { Modal } from '../../../components/UI/Modal';

interface DeleteConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  institutionName: string;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  visible,
  onClose,
  onConfirm,
  institutionName,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      title="Подтвердите удаление"
      subtitle="Это действие нельзя будет отменить"
      icon="alert-circle-outline"
      iconColor="#C73E3E"
      iconBackgroundColor="#FFE5E5"
      dismissable={true}
      showCloseButton={true}
      maxContentHeight={200}
      width={480}
      actions={
        <>
          <CustomButton
            label="Отменить"
            onPress={onClose}
            variant="outline"
          />
          <CustomButton
            label="Удалить"
            onPress={handleConfirm}
            variant="primary"
            style={styles.deleteButton}
          />
        </>
      }
    >
      <View style={styles.content}>
        <Text style={styles.message}>
          Вы уверены, что хотите удалить учреждение{' '}
          <Text style={styles.institutionName}>"{institutionName}"</Text>?
        </Text>
        <Text style={styles.warning}>
          Все связанные данные, включая камеры и записи, будут безвозвратно удалены.
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  message: {
    fontSize: 15,
    color: '#1B1B1B',
    lineHeight: 22,
  },
  institutionName: {
    fontWeight: '700',
    color: '#1B1B1B',
  },
  warning: {
    fontSize: 14,
    color: '#717182',
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: '#C73E3E',
  },
});
