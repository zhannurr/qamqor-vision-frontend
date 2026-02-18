import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { UserFormData, roleDisplayNames } from '../types/user.types';
import { useAddUserForm } from '../hooks/useAddUserForm';
import { Modal } from '../../../components/UI/Modal';
import { CustomButton } from '../../../components/UI/CustomButton';

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  mode: 'create' | 'edit';
  initialData?: UserFormData | null;
}

const ROLES = [
  { value: 'operator', label: 'Оператор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'analyst', label: 'Аналитик' },
  { value: 'admin', label: 'Администратор' },
  { value: 'user', label: 'Пользователь' },
];

export const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialData,
}) => {
  const {
    formData,
    errors,
    showRoleDropdown,
    setShowRoleDropdown,
    handleInputChange,
    handleSubmit,
    handleClose,
  } = useAddUserForm(visible, mode, initialData, onClose, onSubmit);

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      title={mode === 'create' ? 'Добавить пользователя' : 'Редактировать пользователя'}
      subtitle="Заполните информацию о пользователе"
      icon="account-outline"
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
            label={mode === 'create' ? 'Создать пользователя' : 'Сохранить изменения'}
            onPress={handleSubmit}
            variant="primary"
          />
        </>
      }
    >
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          mode="outlined"
          placeholder="Введите email"
          placeholderTextColor="#9E9E9E"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          style={styles.input}
          outlineColor={errors.email ? '#EF5350' : '#E0E0E0'}
          activeOutlineColor={errors.email ? '#EF5350' : '#A89AB8'}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={mode === 'edit'}
          error={!!errors.email}
          left={
            <TextInput.Icon
              icon={() => (
                <Icon name="email-outline" size={20} color="#717182" />
              )}
            />
          }
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Имя</Text>
          <TextInput
            mode="outlined"
            placeholder="Введите имя"
            placeholderTextColor="#9E9E9E"
            value={formData.first_name}
            onChangeText={(text) => handleInputChange('first_name', text)}
            style={styles.input}
            outlineColor={errors.first_name ? '#EF5350' : '#E0E0E0'}
            activeOutlineColor={errors.first_name ? '#EF5350' : '#A89AB8'}
            error={!!errors.first_name}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="account-outline" size={20} color="#717182" />
                )}
              />
            }
          />
          {errors.first_name && (
            <Text style={styles.errorText}>{errors.first_name}</Text>
          )}
        </View>

        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput
            mode="outlined"
            placeholder="Введите фамилию"
            placeholderTextColor="#9E9E9E"
            value={formData.last_name}
            onChangeText={(text) => handleInputChange('last_name', text)}
            style={styles.input}
            outlineColor={errors.last_name ? '#EF5350' : '#E0E0E0'}
            activeOutlineColor={errors.last_name ? '#EF5350' : '#A89AB8'}
            error={!!errors.last_name}
          />
          {errors.last_name && (
            <Text style={styles.errorText}>{errors.last_name}</Text>
          )}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Телефон
          <Text style={styles.optional}> (необязательно)</Text>
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Введите номер телефона"
          placeholderTextColor="#9E9E9E"
          value={formData.phone_number}
          onChangeText={(text) => handleInputChange('phone_number', text)}
          style={styles.input}
          outlineColor="#E0E0E0"
          activeOutlineColor="#A89AB8"
          keyboardType="phone-pad"
          left={
            <TextInput.Icon
              icon={() => (
                <Icon name="phone-outline" size={20} color="#717182" />
              )}
            />
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Роль</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowRoleDropdown(!showRoleDropdown)}
          activeOpacity={0.7}
        >
          <View style={styles.dropdownButtonContent}>
            <Icon name="account-cog-outline" size={20} color="#717182" />
            <Text style={styles.dropdownButtonText}>
              {roleDisplayNames[formData.role] || formData.role}
            </Text>
          </View>
          <Icon
            name={showRoleDropdown ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#717182"
          />
        </TouchableOpacity>
        {showRoleDropdown && (
          <View style={styles.dropdownMenu}>
            {ROLES.map((role) => (
              <TouchableOpacity
                key={role.value}
                style={styles.dropdownItem}
                onPress={() => {
                  handleInputChange('role', role.value);
                  setShowRoleDropdown(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    formData.role === role.value && styles.dropdownItemTextActive,
                  ]}
                >
                  {role.label}
                </Text>
                {formData.role === role.value && (
                  <Icon
                    name="check"
                    size={20}
                    color="#A89AB8"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {mode === 'create' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            mode="outlined"
            placeholder="Введите пароль (минимум 6 символов)"
            placeholderTextColor="#9E9E9E"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            style={styles.input}
            outlineColor={errors.password ? '#EF5350' : '#E0E0E0'}
            activeOutlineColor={errors.password ? '#EF5350' : '#A89AB8'}
            secureTextEntry
            error={!!errors.password}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="lock-outline" size={20} color="#717182" />
                )}
              />
            }
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
      )}

      <View style={styles.noteContainer}>
        <Icon name="information-outline" size={20} color="#2196F3" />
        <Text style={styles.noteText}>
          Примечание: после создания пользователь получит доступ к системе
          с указанным email и паролем.
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#EF5350',
    marginTop: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 56,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  dropdownItemTextActive: {
    color: '#A89AB8',
    fontWeight: '600',
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
