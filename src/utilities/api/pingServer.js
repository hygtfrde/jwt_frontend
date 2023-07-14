import {RENDER_EXPRESS_API} from '@/constants';

export const pingServerDefault = async (RENDER_EXPRESS_API) => {

  fetch(`${RENDER_EXPRESS_API}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    console.log('res => ', res)
    res.json();
  })
  .catch(err => {
    console.error('error pinging API ===> ', err);
  });

};


export const waitPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 20000);
    console.log('DONE WAITING!')
});

