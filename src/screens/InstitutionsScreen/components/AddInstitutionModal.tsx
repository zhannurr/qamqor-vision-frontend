import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

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
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Surface style={styles.modalContainer} elevation={5}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <Icon name="office-building-outline" size={24} color="#8B7A9E" />
              </View>
              <View>
                <Text style={styles.title}>Добавить учреждение</Text>
                <Text style={styles.subtitle}>
                  Заполните информацию об учреждении
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#717182" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
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
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={handleClose}
              style={styles.cancelButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.cancelButtonLabel}
            >
              Отменить
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.submitButtonLabel}
            >
              Создать учреждение
            </Button>
          </View>
        </Surface>
      </View>
    </Modal>
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
    width: width > 600 ? 580 : width - 40,
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
    borderRadius: 12,
    backgroundColor: '#E8E0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    maxHeight: 500,
  },
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
    borderRadius: 12,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    marginLeft: 12,
    lineHeight: 18,
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
  cancelButton: {
    borderRadius: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
  },
  submitButton: {
    backgroundColor: '#A89AB8',
    borderRadius: 12,
  },
  buttonContent: {
    height: 48,
    paddingHorizontal: 20,
  },
  cancelButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#717182',
  },
  submitButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
