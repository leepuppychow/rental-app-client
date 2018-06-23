import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

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
    setTenants(state, payload) {
      state.tenants = payload;
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
        .then((response) => console.log(response))
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
        .then((response) => console.log(response))
        .then(() => dispatch('fetchProperties'))
        .catch(error => console.log({ error }));
    },

    fetchTenants({ commit }, payload) {
      fetch(`${baseURL}/tenants`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(tenants => commit('setTenants', tenants.data))
        .catch(error => console.log({ error }));
    },
  },
});

