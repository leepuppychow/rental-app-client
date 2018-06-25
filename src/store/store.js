import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

export default new Vuex.Store({
  state: {
    properties: [],
    tenants: [],
    bills: [],
    propertiesLoaded: false,
    tenantsLoaded: false,
    billsLoaded: false,
  },
  getters: {
    properties: state => state.properties,
    tenants: state => state.tenants,
    bills: state => state.bills,
    propertiesLoaded: state => state.propertiesLoaded,
    tenantsLoaded: state => state.tenantsLoaded,
    billsLoaded: state => state.billsLoaded,
    getPropertyByID: state => id => state.properties.find(property => property.id === id),
  },
  mutations: {
    setProperties(state, payload) {
      state.properties = payload;
      state.propertiesLoaded = true;
    },
    setTenants(state, payload) {
      state.tenants = payload;
      state.tenantsLoaded = true;
    },
    setBills(state, payload) {
      state.bills = payload;
      state.billsLoaded = true;
    },
  },
  actions: {
    // MAKE MODULES FOR EACH GROUP LATER ON...

    // PROPERTIES
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

    // TENANTS
    fetchTenants({ commit }) {
      fetch(`${baseURL}/tenants`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(tenants => commit('setTenants', tenants.data))
        .catch(error => console.log({ error }));
    },

    // RENT
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

    // BILLS
    fetchBills({ commit, dispatch }, payload) {
      fetch(`${baseURL}/bills`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(bills => commit('setBills', bills.data))
        .catch(error => console.log({ error }));
    },
    setTenantBillsForProperty({ dispatch }, payload) {
      const { propertyID, splitAmount } = payload;
      const body = {
        propertyID,
        splitAmount,
      };

      fetch(`${baseURL}/tenant-bills`, {
        method: 'PUT',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then((data) => {
          // Here dispatch('fetchTenantBills')
        })
        .catch(error => console.log({ error }));
    },
  },
});

