import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    properties: [
      { id: 1, name: 'Zion1', street: '3033 Zion St', city: 'Aurora', state: 'CO', zipcode: 80011 },
      { id: 2, name: 'Thornton', street: '12527 N Ash St', city: 'Thornton', state: 'CO', zipcode: 80241 },
      { id: 3, name: 'Denver', street: '123 Denver Way', city: 'Denver', state: 'CO', zipcode: 80010 },
    ],
    tenants: [

    ],
  },
  getters: {
    properties: state => state.properties,
    tenants: state => state.tenants,
    // getPropertyByID: state => id => state.properties.filter(property => property.id === id),
  },
  mutations: {

  },
  actions: {

  },
});

