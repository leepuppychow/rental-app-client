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
  });

  it('can compute the current billTotal', () => {
    assert.equal(wrapper.vm.billTotal, 150);
  });

  it('can compute the numberOfTenants', () => {
    assert.equal(wrapper.vm.numberOfTenants, 4);
  });

  it('on mount it will divideBillsAmongTenants', () => {
    assert.equal(wrapper.vm.splitBillsAmount, 37.5);
  });

  // test Watchers
  it('will update the splitBillAmount if the billTotal changes', () => {
    wrapper.setProps({
      bills: [
        ...bills,
        { id: 4, amount: 50, shared: true },
      ],
    });
    assert.equal(wrapper.vm.splitBillsAmount, 50);
  });

  it('will update the splitBillAmount if the billTotal changes, but only if it is a shared bill', () => {
    wrapper.setProps({
      bills: [
        ...bills,
        { id: 4, amount: 50, shared: false },
      ],
    });
    assert.equal(wrapper.vm.splitBillsAmount, 37.5);
  });
  
  it('will update the splitBillAmount if the numberOfTenants changes', () => {
    wrapper.setProps({
      tenants: [
        ...tenants, 
        { id: 5, name: 'Tobi', active: true },
      ],
    })
    assert.equal(wrapper.vm.splitBillsAmount, 30);
  });

  it('will update the splitBillAmount if the numberOfTenants changes, but only if tenant is active', () => {
    wrapper.setProps({
      tenants: [
        ...tenants, 
        { id: 5, name: 'Tobi', active: false },
      ],
    })
    assert.equal(wrapper.vm.splitBillsAmount, 37.5);
  });
});

