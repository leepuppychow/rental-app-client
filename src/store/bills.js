const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const bills = {
  state: {
    bills: [],
    billsLoaded: false,
  },
  getters: {
    bills: state => state.bills,
    billsLoaded: state => state.billsLoaded,
  },
  mutations: {
    setBills(state, payload) {
      state.bills = payload;
      state.billsLoaded = true;
    },
  },
  actions: {
    fetchBills({ commit, dispatch }, payload) {
      fetch(`${baseURL}/bills`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(response => commit('setBills', response.data))
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
}

export default bills;