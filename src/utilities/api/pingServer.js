import React from 'react';
import {API_URL} from '@/constants';

export const pingServerDefault = async (API_URL) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout: Server not responding'));
      }, 20000);
    });
  
    try {
      const response = await Promise.race([
        fetch(API_URL),
        timeoutPromise,
      ]);

      console.log('......... ', response)
  
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
        console.log('......... ', error)
        throw error;
    }
  };
  
  

export const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 10000);
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

      
  