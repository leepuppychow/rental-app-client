const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const propertiesModule = {
  state: {
    properties: [],
  },
  getters: {
    properties: state => state.properties,
  },
  mutations: {
    setProperties(state, payload) {
      state.properties = payload;
    },
  },
  actions: {
    fetchProperties({ commit }) {
      fetch(`${baseURL}/properties`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(properties => commit('setProperties', properties.data))
        .catch(error => console.log({ error }));
    },
    createNewProperty({ dispatch }, payload) {
      fetch(`${baseURL}/properties`, {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => dispatch('fetchProperties'))
        .catch(error => console.log({ error }));
    },
    deleteProperty({ dispatch }, payload) {
      const id = payload;

      fetch(`${baseURL}/properties/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(() => dispatch('fetchProperties'))
        .catch(error => console.log({ error }));
    },
  },
};

export default propertiesModule;
