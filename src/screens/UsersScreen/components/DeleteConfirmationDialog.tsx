import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Portal, Dialog } from 'react-native-paper';
import { CustomButton } from '../../../components/UI/CustomButton';

interface DeleteConfirmationDialogProps {
  visible: boolean;
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  visible,
  userName,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
        <Dialog.Title style={styles.title}>
          Подтверждение удаления
        </Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>
            Вы уверены, что хотите удалить пользователя{' '}
            <Text style={styles.userName}>{userName}</Text>?
          </Text>
          <Text style={styles.warning}>
            Это действие нельзя будет отменить.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <CustomButton
            label="Отмена"
            onPress={onCancel}
            variant="outline"
            size="medium"
          />
          <CustomButton
            label="Удалить"
            onPress={onConfirm}
            variant="primary"
            size="medium"
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  message: {
    fontSize: 16,
    color: '#1B1B1B',
    lineHeight: 24,
  },
  userName: {
    fontWeight: '600',
    color: '#A89AB8',
  },
  warning: {
    fontSize: 14,
    color: '#EF5350',
    marginTop: 12,
    fontStyle: 'italic',
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
});
