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
    toggleTenantActive({ dispatch }, payload) {
      const { tenantID, active } = payload;
      fetch(`${baseURL}/tenants/${tenantID}?active=${active}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch('fetchTenants');
          } else {
            alert('Error occured');
          }
        })
        .catch(error => console.error({ error }));
    },
    createTenant({ dispatch }, payload) {
      fetch(`${baseURL}/tenants`, {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          debugger;
          dispatch('fetchTenants');
        })
        .catch(error => console.log({ error }));
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