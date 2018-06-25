const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const tenants = {
  state: {
    tenants: [],
    tenantsLoaded: false,
  },
  getters: {
    tenants: state => state.tenants,
    tenantsLoaded: state => state.tenantsLoaded,
  },
  mutations: {
    setTenants(state, payload) {
      state.tenants = payload;
      state.tenantsLoaded = true;
    },
  },
  actions: {
    fetchTenants({ commit }) {
      fetch(`${baseURL}/tenants`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(tenants => commit('setTenants', tenants.data))
        .catch(error => console.log({ error }));
    },
  },
};

export default tenants;