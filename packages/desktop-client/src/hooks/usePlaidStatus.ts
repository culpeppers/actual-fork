import { useEffect, useState } from 'react';

import { send } from 'loot-core/src/platform/client/fetch';

import { useSyncServerStatus } from './useSyncServerStatus';

export function usePlaidStatus() {
  const [configuredPlaid, setConfiguredPlaid] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const status = useSyncServerStatus();

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);

      const results = await send('plaid-status');

      setConfiguredPlaid(results.configured || false);
      setIsLoading(false);
    }

    if (status === 'online') {
      fetch();
    }
  }, [status]);

  return {
    configuredPlaid,
    isLoading,
  };
}
