import {RENDER_EXPRESS_API} from '@/constants';

export const pingServerDefault = async (RENDER_EXPRESS_API) => {

  console.log('Attempt to ping API: ', RENDER_EXPRESS_API)

  const controller = new AbortController();
  const signal = controller.signal;

  const ping = async () => {
    try {
      const response = await fetch(RENDER_EXPRESS_API, { signal });

      if (response.ok) {
        console.log('Ping successful');
        return { success: true };
      } else {
        console.error('Ping server timed out');
        throw new Error('Timeout: Server not responding');
      }
    } catch (error) {
      console.error('Ping error:', error);
      throw new Error('Timeout: Server not responding');
    }
  };

  const pingWithRetry = async () => {
    try {
      const result = await ping();
      if (result.success) {
        return result;
      } else {
        // Retry after 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));
        return pingWithRetry();
      }
    } catch (error) {
      throw error;
    }
  };

  return pingWithRetry();
};



export const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 120000);
});

