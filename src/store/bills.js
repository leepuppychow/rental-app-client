const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const billsModule = {
  state: {
    bills: [],
  },
  getters: {
    bills: state => state.bills,
  },
  mutations: {
    setBills(state, payload) {
      state.bills = payload;
    },
  },
  actions: {
    fetchBills({ commit }) {
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
        .then(() => dispatch('fetchBills'))
        .catch(error => console.log({ error }));
    },

    createNewBill({ dispatch }, payload) {
      fetch(`${baseURL}/bills`, {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(() => dispatch('fetchBills'))
        .catch(error => console.log({ error }));
    },

    updateBill({ dispatch }, payload) {
      const { billID, type, amount, date, shared } = payload;
      const body = {
        type,
        amount,
        date,
        shared,
      };
      
      fetch(`${baseURL}/bills/${billID}`, {
        method: 'PUT',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(() => dispatch('fetchBills'))
        .catch(err => console.log({ err }));
    },

    deleteBill({ dispatch }, payload) {
      const billID = payload;
      if (window.confirm('Are you sure you want to delete this bill?')) {
        fetch(`${baseURL}/bills/${billID}`, {
          method: 'DELETE',
          headers: authHeaders(),
        })
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            dispatch('fetchBills');
          })
          .catch(error => console.log({ error }));
      }
    },
  },
};

export default billsModule;
