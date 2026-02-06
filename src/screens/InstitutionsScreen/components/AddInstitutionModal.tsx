import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { CustomButton } from '../../../components/UI/CustomButton';
import { Modal } from '../../../components/UI/Modal';

interface AddInstitutionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: InstitutionFormData) => void;
}

export interface InstitutionFormData {
  name: string;
  description: string;
  address: string;
  mapLink: string;
}

export const AddInstitutionModal: React.FC<AddInstitutionModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: '',
    description: '',
    address: '',
    mapLink: '',
  });

  const handleSubmit = () => {
    // Валидация
    if (!formData.name || !formData.address) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    // Сброс формы
    setFormData({
      name: '',
      description: '',
      address: '',
      mapLink: '',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      title="Добавить учреждение"
      subtitle="Заполните информацию об учреждении"
      icon="office-building-outline"
      iconColor="#8B7A9E"
      iconBackgroundColor="#E8E0F0"
      dismissable={true}
      showCloseButton={true}
      maxContentHeight={500}
      width={580}
      actions={
        <>
          <CustomButton
            label="Отменить"
            onPress={handleClose}
            variant="outline"
          />
          <CustomButton
            label="Создать учреждение"
            onPress={handleSubmit}
            variant="primary"
          />
        </>
      }
    >
      {/* Form Fields */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Название учреждения</Text>
              <TextInput
                mode="outlined"
                placeholder="Главный офис, Склад А"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#A89AB8"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="office-building-outline" size={20} color="#717182" />
                    )}
                  />
                }
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Описание учреждения</Text>
              <TextInput
                mode="outlined"
                placeholder="Введите описание учреждения"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                style={styles.textArea}
                outlineColor="#E0E0E0"
                activeOutlineColor="#A89AB8"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Адрес</Text>
              <TextInput
                mode="outlined"
                placeholder="ул. Абая, 123"
                value={formData.address}
                onChangeText={(text) =>
                  setFormData({ ...formData, address: text })
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#A89AB8"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="map-marker-outline" size={20} color="#717182" />
                    )}
                  />
                }
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Ссылка на карту
                <Text style={styles.optional}> (необязательно)</Text>
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Вставьте ссылку Google Maps / 2GIS"
                value={formData.mapLink}
                onChangeText={(text) =>
                  setFormData({ ...formData, mapLink: text })
                }
                style={styles.input}
                outlineColor="#E0E0E0"
                activeOutlineColor="#A89AB8"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="link-variant" size={20} color="#717182" />
                    )}
                  />
                }
              />
              <Text style={styles.hint}>
                Вставьте ссылку на расположение учреждения из Google Maps или 2GIS
              </Text>
            </View>

      {/* Info Note */}
      <View style={styles.noteContainer}>
        <Icon name="information-outline" size={20} color="#2196F3" />
        <Text style={styles.noteText}>
          Примечание: добавив учреждение вы сможете добавить камеры,
          назначить пользователей и настроить модули видеомониторинга.
        </Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
    marginBottom: 8,
  },
  optional: {
    fontSize: 12,
    fontWeight: '400',
    color: '#717182',
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    minHeight: 100,
  },
  hint: {
    fontSize: 12,
    color: '#717182',
    marginTop: 6,
    lineHeight: 16,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    marginLeft: 12,
    lineHeight: 18,
  },
});
