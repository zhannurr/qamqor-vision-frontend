export interface Institution {
  id: string;
  name: string;
  address: string;
  manager: string;
  isActive: boolean;
  stats: {
    cameras: number;
    users: number;
    incidents: number;
  };
  activeModules: {
    smokDetection: boolean;
    fireDetection: boolean;
    accessControl: boolean;
    perimeterMonitoring: boolean;
  };
}
