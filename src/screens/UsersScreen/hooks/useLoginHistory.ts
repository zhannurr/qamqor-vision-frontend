import { useState, useEffect, useCallback } from 'react';
import type { LoginHistoryEntry } from '../../../api/users';

const PAGE_SIZE = 10;

export function useLoginHistory(
  visible: boolean,
  userId: string | undefined,
  onGetLoginHistory: ((userId: string, limit?: number, offset?: number) => Promise<{ login_history: LoginHistoryEntry[]; limit: number; offset: number } | null>) | undefined
) {
  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const loadLoginHistory = useCallback(async () => {
    if (!userId || !onGetLoginHistory) return;
    setLoadingHistory(true);
    try {
      const result = await onGetLoginHistory(userId, PAGE_SIZE, 0);
      setLoginHistory(result?.login_history ?? []);
    } catch (error) {
      console.error('Error loading login history:', error);
      setLoginHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  }, [userId, onGetLoginHistory]);

  useEffect(() => {
    if (visible && userId && onGetLoginHistory) {
      loadLoginHistory();
    } else if (!visible) {
      setLoginHistory([]);
    }
  }, [visible, userId, onGetLoginHistory, loadLoginHistory]);

  return { loginHistory, loadingHistory };
}
