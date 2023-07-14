export const pingServerDefault = async (LIVE_URL) => {
  try {
    const response = await fetch(LIVE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Ping Response: ', response);

    if (response.ok) {
      console.log('Ping is OK');
      return { success: true };
    } else {
      console.log('Ping failure');
      return { success: false };
    }
  } catch (error) {
    console.error('Other ping error: ', error);
    return { success: false };
  }
};



export const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 20000);
    console.log('DONE WAITING!')
});

