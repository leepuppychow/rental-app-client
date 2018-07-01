import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import Property from '@/components/Property';
import fixtures from './fixtures';

const factory = (data = {}, props = {}) => shallowMount(Property, {
  data: {
    ...data,
  },
  propsData: {
    ...props,
  },
});
const property = fixtures.properties[0];
const { tenants, bills } = fixtures;


// describe('Property', () => {
//   it('can compute the current billTotal', () => {
//     const wrapper = factory({}, { property, tenants, bills });
//     // Need to stub store action (setTenantBillsForProperty)

//     console.log(wrapper.vm.bills);
//   });
// });



describe('Property', () => {
  it('can compute the current billTotal()', () => {
    const vm = new Vue(Property).$mount();
    vm.bills = bills;

    assert.equal(vm.billTotal, 150);
  });

  it('can compute the numberOfTenants()', () => {
    const vm = new Vue(Property).$mount();
    vm.tenants = tenants;

    assert.equal(vm.numberOfTenants, 4);
  });
})
