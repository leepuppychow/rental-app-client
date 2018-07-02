import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Property from '@/components/Property';
import fixtures from './fixtures';

// Use localVue so you do not affect global Vue constructor
const localVue = createLocalVue();
localVue.use(Vuex);

// Stub out the actions in our Vuex store
const actions = {
  setTenantBillsForProperty: sinon.stub(),
};
const store = new Vuex.Store({
  state: {},
  actions,
});

// Factory function to create shallow mounted Property instances
const factory = (data = {}, props = {}) => shallowMount(Property, {
  data: {
    ...data,
  },
  propsData: {
    ...props,
  },
  store,
  localVue,
});
const { tenants, bills, properties } = fixtures;
const property = properties[0];

describe('Property', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory({}, { bills, tenants, property });
  })

  it('can compute the current billTotal', () => {
    assert.equal(wrapper.vm.billTotal, 150);
  });

  it('can compute the number of tenants', () => {
    assert.equal(wrapper.vm.numberOfTenants, 4);
  })
});

