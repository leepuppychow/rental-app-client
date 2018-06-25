const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const rentModule = {
  actions: {
    setRent({ dispatch }, payload) {
      const { propertyID, rent } = payload;
      const body = {
        amount: rent,
      };

      fetch(`${baseURL}/rent/${propertyID}`, {
        method: 'PUT',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then((data) => {
          dispatch('fetchProperties');
          alert(data.message);
        })
        .catch(err => console.log(err));
    },
  },
};

export default rentModule;
