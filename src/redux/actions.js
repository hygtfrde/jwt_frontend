export const setEmail = (email) => {
    return {
      type: 'SET_EMAIL',
      payload: email,
    };
};
  
  export const setPassword = (password) => {
    return {
      type: 'SET_PASSWORD',
      payload: password,
    };
};