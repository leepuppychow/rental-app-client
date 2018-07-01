// import Vue from 'vue';
// import { shallowMount } from '@vue/test-utils';
// import Property from '@/components/Property';

// const factory = (data = {}, props = {}) => shallowMount(Property, {
//     data: {
//       ...data,
//     },
//     props: {
//       ...props,
//     },
//   });

// const bills = [
//   { amount: 60 },
//   { amount: 40 },
//   { amount: 50 },
// ];

// describe('Property', () => {
//   it('can compute the current billTotal', () => {
//     const wrapper = factory({}, { bills });

//     console.log(wrapper)

//   });
// });

// // describe('Property.vue', () => {
// //   it('can compute the current billTotal()', () => {
// //     const vm = new Vue(Property).$mount();
// //     vm.bills = [
// //       { amount: 60 },
// //       { amount: 40 },
// //       { amount: 50 },
// //     ];

// //     assert.equal(vm.billTotal, 150);
// //   });

// //   it('can compute the numberOfTenants()', () => {
// //     const vm = new Vue(Property).$mount();
// //     vm.tenants = [
// //       { name: 'Lee' },
// //       { name: 'Lee1' },
// //       { name: 'Lee2' },
// //     ];

// //     assert.equal(vm.numberOfTenants, 3);
// //   });

// //   it('can divideBillsAmongTenants()', () => {
// //     const vm = new Vue(Property).$mount();

// //     // Need to stub the Vuex store??

// //     vm.bills = [
// //       { amount: 60 },
// //       { amount: 40 },
// //       { amount: 50 },
// //     ];
// //     vm.tenants = [
// //       { name: 'Lee' },
// //       { name: 'Lee1' },
// //       { name: 'Lee2' },
// //     ];
// //     vm.property = { id: 1 };
// //     vm.splitBillsAmount = 0;

// //     assert.equal(vm.splitBillsAmount, 0);
// //     vm.divideBillsAmongTenants();
// //     assert.equal(vm.splitBillsAmount, 50);
// //   });
// // });
