export interface Institution {
  organization_id: string;
  name: string;
  description: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  map_url: string;
  active_modules: string; // JSON string of active modules
}

export interface ActiveModules {
  smokDetection: boolean;
  fireDetection: boolean;
  accessControl: boolean;
  perimeterMonitoring: boolean;
}

export interface InstitutionFormData {
  name: string;
  description: string;
  address: string;
  map_url: string;
  active_modules: ActiveModules;
}
