import Vue from 'vue';
import Vuex from 'vuex';
import properties from './properties';
import tenants from './tenants';
import bills from './bills';
import rent from './rent';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    properties,
    tenants,
    bills,
    rent,
  },
});

