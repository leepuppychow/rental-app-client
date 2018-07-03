const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const tenantsModule = {
  state: {
    tenants: [],
  },
  getters: {
    tenants: state => state.tenants,
  },
  mutations: {
    setTenants(state, payload) {
      state.tenants = payload;
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
    archiveTenant({ dispatch }, payload) {
      const tenantID = payload; 
      fetch(`${baseURL}/tenants/${tenantID}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
        .then(response => {
          if (response.status === 200) {
            alert('Tenant was archived');
            dispatch('fetchTenants');
          } else {
            alert('Error occured');
          }
        })
        .catch(error => console.error({ error }));
    },
    updateTenant({ dispatch }, payload) {
      const { tenantID, status, firstName, lastName, email, phone, venmo } = payload;
      const body = {
        firstName,
        lastName,
        email,
        phone,
        status,
        venmo,
      }
      fetch(`${baseURL}/tenants/${tenantID}`, {
        method: 'PUT',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.parse(body),
      })
        .then(response => {
          response.json();
          debugger;
          dispatch('fetchTenants');
        })
        .catch(error => console.error({ error }))
    },
  },
};

export default tenantsModule;