import { API_URL } from "@/constants";

const UserApi = {
  updateSignInDate: () => {
    const getUserData = fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.uid}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
        return data; // Return the data to be used in the subsequent POST request
      })
      .catch(err => {
        // Handle any errors here
        console.error(err);
        throw err; // Throw the error to be caught by the calling function
      });

    getUserData
      .then(userData => {
        // Proceed with the POST request using the userData
        return fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.uid}`
          },
          body: JSON.stringify(userData) // Use the retrieved user data in the request body
        });
      })
      .then(res => res.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
      })
      .catch(err => {
        // Handle any errors here
        console.error(err);
      });
  },

  //============================
  // successful submission
  //============================
  handleSubmit200: (event) => {
    event.preventDefault();

    const userLogin = {
      email: email,
      password: password
    };


    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    })
    .then(res => {
      return res.json(); // Return the parsed JSON
    })
    .then(data => {
      setCurrentUser(data.signedJwt);
      navigate('/profile'); 
      console.log('Sending user to profile!');
    })
    .catch(err => {
      setError({ ...err });
      console.error('error ===> ', error);
    });
  }
}

export default UserApi;
