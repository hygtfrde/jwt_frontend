import React from 'react';
import {API_URL} from '@/constants';

export const pingServer = async (API_URL) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout 15'));
      }, 15000);
    });
  
    return Promise.race([
      fetch(API_URL).then((response) => {
        if (response.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
      }),
      timeoutPromise,
    ]);
  };

  export const pingServerDefault = async (API_URL) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout 30'));
      }, 30000);
    });
    return Promise.race([
      fetch(API_URL).then((response) => {
        if (response.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
      }),
      timeoutPromise,
    ]);
  };
  
  
  

export const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
        // Reject with timeout error
        reject(new Error('Timeout'));
    }, 45000); // 45 seconds
});

export const waitPromise = new Promise((resolve) => {
    // Wait for 1 minute before resolving
    setTimeout(() => {
        // Resolve after 2 minutes
        resolve();
    }, 120000);
});

const handleSubmit = async () => {
    try {
      // Perform the ping request and wait for either success or timeout
      const response = await Promise.race([pingServer(), timeoutPromise]);
  
      // Check the response
      if (response.success) {
        // Proceed with axios post
        await axios.post(`${API_URL}/user`, userObject);
        console.log('Post request success');
      } else {
        // Timeout occurred, wait for 1 minute before retrying
        console.log('Timeout occurred. Waiting for 1 minute...');
        await waitPromise;
        console.log('Retry post request...');
        await axios.post(`${API_URL}/user`, userObject);
        console.log('Post request success');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

      
  