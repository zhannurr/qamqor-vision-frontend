import { Institution } from '../types/institution.types';

export const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Главный офис',
    address: 'ул. Абая, 150, Алматы',
    manager: 'Иванов И.И.',
    isActive: true,
    stats: {
      cameras: 32,
      users: 8,
      incidents: 12,
    },
    activeModules: {
      smokDetection: true,
      fireDetection: true,
      accessControl: true,
      perimeterMonitoring: true,
    },
  },
  {
    id: '2',
    name: 'Склад A',
    address: 'ул. Сатпаева, 25, Алматы',
    manager: 'Петрова А.С.',
    isActive: true,
    stats: {
      cameras: 16,
      users: 5,
      incidents: 8,
    },
    activeModules: {
      smokDetection: true,
      fireDetection: true,
      accessControl: false,
      perimeterMonitoring: true,
    },
  },
  {
    id: '3',
    name: 'Склад Б',
    address: 'пр. Аль-Фараби, 77, Алматы',
    manager: 'Смирнов А.В.',
    isActive: true,
    stats: {
      cameras: 18,
      users: 4,
      incidents: 5,
    },
    activeModules: {
      smokDetection: true,
      fireDetection: false,
      accessControl: true,
      perimeterMonitoring: false,
    },
  },
  {
    id: '4',
    name: 'Аналитический центр',
    address: 'ул. Розыбакиева, 289, Алматы',
    manager: 'Кузнецова М.А.',
    isActive: true,
    stats: {
      cameras: 12,
      users: 6,
      incidents: 2,
    },
    activeModules: {
      smokDetection: true,
      fireDetection: true,
      accessControl: true,
      perimeterMonitoring: false,
    },
  },
  {
    id: '5',
    name: 'Офис №2',
    address: 'ул. Байзакова, 180, Алматы',
    manager: 'Сидоров К.П.',
    isActive: false,
    stats: {
      cameras: 24,
      users: 7,
      incidents: 15,
    },
    activeModules: {
      smokDetection: false,
      fireDetection: true,
      accessControl: true,
      perimeterMonitoring: true,
    },
  },

];
