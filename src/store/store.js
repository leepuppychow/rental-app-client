import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const authHeaders = () => ({ authorization: localStorage.getItem('id_token') });

export default new Vuex.Store({
  state: {
    properties: [],
    tenants: [],
  },
  getters: {
    properties: state => state.properties,
    tenants: state => state.tenants,
    getPropertyByID: state => id => state.properties.find(property => property.id === id),
  },
  mutations: {
    setProperties(state, payload) {
      state.properties = payload;
    },
  },
  actions: {
    fetchProperties({ commit }) {
      fetch('http://localhost:3000/api/v1/properties', {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(properties => commit('setProperties', properties.data))
        .catch(error => console.log({ error }));
    },
    createNewProperty({ dispatch }, payload) {
      fetch('http://localhost:3000/api/v1/properties', {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then((response) => console.log(response))
        .then(() => dispatch('fetchProperties'))
        .catch(error => console.log({ error }));
    },
    deleteProperty({ dispatch }, payload) {
      const id = payload;

      fetch(`http://localhost:3000/api/v1/properties/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then((response) => console.log(response))
        .then(() => dispatch('fetchProperties'))
        .catch(error => console.log({ error }));
    },
  },
});

