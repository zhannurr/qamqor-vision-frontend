import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput, Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { CustomButton } from '../../../components/UI/CustomButton';
import { Modal } from '../../../components/UI/Modal';
import { InstitutionFormData, ActiveModules } from '../types/institution.types';

export type { InstitutionFormData };

interface AddInstitutionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: InstitutionFormData) => void;
  mode?: 'create' | 'edit';
  initialData?: InstitutionFormData & { organization_id?: string; is_active?: boolean };
  onValidationError?: (message: string) => void;
}

export const AddInstitutionModal: React.FC<AddInstitutionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  mode = 'create',
  initialData,
  onValidationError,
}) => {
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: '',
    description: '',
    address: '',
    map_url: '',
    active_modules: {
      smokDetection: false,
      fireDetection: false,
      accessControl: false,
      perimeterMonitoring: false,
    },
  });

  // Загружаем initialData при открытии в режиме редактирования
  React.useEffect(() => {
    if (visible && mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        address: initialData.address,
        map_url: initialData.map_url,
        active_modules: initialData.active_modules,
      });
    } else if (visible && mode === 'create') {
      // Сбрасываем форму для создания
      setFormData({
        name: '',
        description: '',
        address: '',
        map_url: '',
        active_modules: {
          smokDetection: false,
          fireDetection: false,
          accessControl: false,
          perimeterMonitoring: false,
        },
      });
    }
  }, [visible, mode, initialData]);

  const handleSubmit = () => {
    // Валидация
    if (!formData.name || !formData.address) {
      if (onValidationError) {
        onValidationError('Пожалуйста, заполните обязательные поля');
      }
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
      map_url: '',
      active_modules: {
        smokDetection: false,
        fireDetection: false,
        accessControl: false,
        perimeterMonitoring: false,
      },
    });
    onClose();
  };

  const toggleModule = (module: keyof ActiveModules) => {
    setFormData({
      ...formData,
      active_modules: {
        ...formData.active_modules,
        [module]: !formData.active_modules[module],
      },
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      title={mode === 'edit' ? 'Редактировать учреждение' : 'Добавить учреждение'}
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
            label={mode === 'edit' ? 'Сохранить изменения' : 'Создать учреждение'}
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
                placeholder="Введите название учреждения"
                placeholderTextColor="#9E9E9E"
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
                placeholderTextColor="#9E9E9E"
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
                placeholder="Введите адрес"
                placeholderTextColor="#9E9E9E"
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
                placeholder="Введите ссылку на карту"
                placeholderTextColor="#9E9E9E"
                value={formData.map_url}
                onChangeText={(text) =>
                  setFormData({ ...formData, map_url: text })
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

            <View style={styles.formGroup}>
              <Text style={styles.label}>Активные модули</Text>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  style={styles.checkboxRow} 
                  onPress={() => toggleModule('smokDetection')}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    status={formData.active_modules.smokDetection ? 'checked' : 'unchecked'}
                    onPress={() => toggleModule('smokDetection')}
                    color="#A89AB8"
                  />
                  <Text style={styles.checkboxLabel}>Обнаружение дыма</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.checkboxRow} 
                  onPress={() => toggleModule('fireDetection')}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    status={formData.active_modules.fireDetection ? 'checked' : 'unchecked'}
                    onPress={() => toggleModule('fireDetection')}
                    color="#A89AB8"
                  />
                  <Text style={styles.checkboxLabel}>Обнаружение огня</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.checkboxRow} 
                  onPress={() => toggleModule('accessControl')}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    status={formData.active_modules.accessControl ? 'checked' : 'unchecked'}
                    onPress={() => toggleModule('accessControl')}
                    color="#A89AB8"
                  />
                  <Text style={styles.checkboxLabel}>Контроль доступа</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.checkboxRow} 
                  onPress={() => toggleModule('perimeterMonitoring')}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    status={formData.active_modules.perimeterMonitoring ? 'checked' : 'unchecked'}
                    onPress={() => toggleModule('perimeterMonitoring')}
                    color="#A89AB8"
                  />
                  <Text style={styles.checkboxLabel}>Мониторинг периметра</Text>
                </TouchableOpacity>
              </View>
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
  checkboxContainer: {
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#1B1B1B',
    marginLeft: 8,
  },
});
