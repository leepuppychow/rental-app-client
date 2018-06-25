import Vue from 'vue';
import Vuex from 'vuex';
import propertiesModule from './properties';
import tenantsModule from './tenants';
import billsModule from './bills';
import rentModule from './rent';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    propertiesModule,
    tenantsModule,
    billsModule,
    rentModule,
  },
});

