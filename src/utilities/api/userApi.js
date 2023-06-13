import { API_URL } from "@/constants";

const UserApi = {
    updateSigninDate: () => {
      fetch(`${API_URL}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.uid}`
        }
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
    }
}

export default UserApi;