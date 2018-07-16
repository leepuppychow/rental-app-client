const authHeaders = () => ({ authorization: localStorage.getItem('token_id') });
const baseURL = 'http://localhost:3000/api/v1';

const roomsModule = {
  state: {
    rooms: [],
  },
  getters: {
    rooms: state => state.rooms,
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
  },
  actions: {
    fetchRooms({ commit }, payload) {
      const propertyID = payload;
      fetch(`${baseURL}/rooms/${propertyID}`, {
        method: 'GET',
        headers: authHeaders(),
      })
        .then(response => response.json())
        .then(response => commit('setRooms', response.data))
        .catch(error => console.log({ error }));
    },
    updateRoom({ dispatch }, payload) {
      const { roomID, propertyID } = payload;
      fetch(`${baseURL}/rooms/${roomID}`, {
        method: 'PUT',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(() => dispatch('fetchRooms', propertyID))
        .catch(error => console.log(error));
    },
  },
};

export default roomsModule;
