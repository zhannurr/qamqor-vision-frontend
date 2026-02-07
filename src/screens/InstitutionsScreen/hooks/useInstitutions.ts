import { useState, useCallback, useEffect } from 'react';
import { Institution, InstitutionFormData, ActiveModules } from '../types/institution.types';
import * as organizationApi from '../../../api/organization';

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectInstitution = useCallback((institution: Institution) => {
    setSelectedInstitution(institution);
    setIsDetailsVisible(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailsVisible(false);
    setTimeout(() => {
      setSelectedInstitution(null);
    }, 300);
  }, []);

  const loadInstitutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.listUserOrganizations();
      if (response.data) {
        setInstitutions(response.data.organizations);
      } else if (response.error) {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Ошибка при загрузке учреждений');
      console.error('Error loading institutions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInstitution = useCallback(async (data: InstitutionFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.createOrganization({
        name: data.name,
        description: data.description,
        address: data.address,
        map_url: data.map_url,
        active_modules: JSON.stringify(data.active_modules),
      });

      if (response.data) {
        // Reload institutions after creating
        await loadInstitutions();
        return true;
      } else if (response.error) {
        setError(response.error.message);
        return false;
      }
    } catch (err) {
      setError('Ошибка при создании учреждения');
      console.error('Error creating institution:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadInstitutions]);

  const updateInstitution = useCallback(async (
    organizationId: string,
    data: Partial<InstitutionFormData> & { is_active?: boolean }
  ) => {
    setLoading(true);
    setError(null);
    try {
      // First get the current organization data
      const currentOrg = institutions.find(inst => inst.organization_id === organizationId);
      if (!currentOrg) {
        setError('Учреждение не найдено');
        return false;
      }

      const response = await organizationApi.updateOrganization({
        organization_id: organizationId,
        name: data.name || currentOrg.name,
        description: data.description || currentOrg.description,
        address: data.address || currentOrg.address,
        is_active: data.is_active !== undefined ? data.is_active : currentOrg.is_active,
        map_url: data.map_url || currentOrg.map_url,
        active_modules: data.active_modules 
          ? JSON.stringify(data.active_modules)
          : currentOrg.active_modules,
      });

      if (response.data) {
        // Reload institutions after updating
        await loadInstitutions();
        return true;
      } else if (response.error) {
        setError(response.error.message);
        return false;
      }
    } catch (err) {
      setError('Ошибка при обновлении учреждения');
      console.error('Error updating institution:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [institutions, loadInstitutions]);

  const deleteInstitution = useCallback(async (organizationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await organizationApi.deleteOrganization(organizationId);

      if (response.data?.success) {
        // Reload institutions after deleting
        await loadInstitutions();
        return true;
      } else if (response.error) {
        setError(response.error.message);
        return false;
      }
    } catch (err) {
      setError('Ошибка при удалении учреждения');
      console.error('Error deleting institution:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadInstitutions]);

  const refreshInstitutions = useCallback(() => {
    loadInstitutions();
  }, [loadInstitutions]);

  // Load institutions on mount
  useEffect(() => {
    loadInstitutions();
  }, [loadInstitutions]);

  return {
    institutions,
    selectedInstitution,
    isDetailsVisible,
    loading,
    error,
    handleSelectInstitution,
    handleCloseDetails,
    refreshInstitutions,
    createInstitution,
    updateInstitution,
    deleteInstitution,
  };
};
