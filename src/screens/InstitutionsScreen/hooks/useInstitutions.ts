import { useState, useCallback } from 'react';
import { Institution } from '../types/institution.types';
import { mockInstitutions } from '../data/mockInstitutions';

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useState<Institution[]>(mockInstitutions);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

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

  const refreshInstitutions = useCallback(() => {
    // В будущем здесь будет API вызов
    setInstitutions(mockInstitutions);
  }, []);

  return {
    institutions,
    selectedInstitution,
    isDetailsVisible,
    handleSelectInstitution,
    handleCloseDetails,
    refreshInstitutions,
  };
};
