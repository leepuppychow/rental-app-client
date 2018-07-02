import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Dashboard from '@/components/Dashboard';
import fixtures from './fixtures';

const localVue = createLocalVue();
localVue.use(Vuex);
const { bills, tenants, properties } = fixtures;

const store = ({ bills, tenants, properties }) => new Vuex.Store({
  state: {
    bills,
    tenants,
    properties,
  },
  getters: {
    // this won't be dynamic though if any of these change
    properties: () => properties,
    tenants: () => tenants,
    bills: () => bills,
  },
  actions: {
    fetchProperties: sinon.stub(),
    fetchTenants: sinon.stub(),
    fetchBills: sinon.stub(),
  },
});

const factory = ({ bills, tenants, properties }) => shallowMount(Dashboard, {
  store: store({ bills, tenants, properties }),
  localVue,
});


describe('Dashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = factory(fixtures);
  });

  it('can get properties, bills from computed properties', () => {
    assert.deepEqual(wrapper.vm.properties, properties);
    assert.deepEqual(wrapper.vm.bills, bills);
  });

  it('can get the activeProperty when component first mounts', () => {
    assert.deepEqual(wrapper.vm.activeProperty, properties[0]);
  });

  it('can setActiveTab', () => {
    assert.equal(wrapper.vm.activeTab, null);
    wrapper.vm.setActiveTab(2);
    assert.equal(wrapper.vm.activeTab, 2);
  });

  it('can get the activeProperty when a tab has been clicked', () => {
    assert.equal(wrapper.vm.activeTab, null);

    const tabs = wrapper.findAll('.property-tab');
    tabs.at(0).trigger('click');
    assert.equal(wrapper.vm.activeTab, 1);
    assert.deepEqual(wrapper.vm.activeProperty, properties[0]);

    tabs.at(2).trigger('click');
    assert.equal(wrapper.vm.activeTab, 3);
    assert.deepEqual(wrapper.vm.activeProperty, properties[2]);
  });

  it('can get bills that belong to this property', () => {
    assert.equal(wrapper.vm.billsOfProperty(1).length, 2);
    assert.equal(wrapper.vm.billsOfProperty(2).length, 1);
    assert.equal(wrapper.vm.billsOfProperty(3).length, 0);
  });

  it('can get tenantOfProperty', () => {
    assert.equal(wrapper.vm.tenantsOfProperty(3).length, 3);
    assert.equal(wrapper.vm.tenantsOfProperty(1).length, 1);
    assert.equal(wrapper.vm.tenantsOfProperty(2).length, 0);
    assert.equal(wrapper.vm.tenantsOfProperty(1)[0].name, 'lee');
  });

  it('will show loading message if no properties are loaded', () => {
    // const noProperties = [];
    // wrapper = factory({ bills, tenants, noProperties });
    
  });
})
;
