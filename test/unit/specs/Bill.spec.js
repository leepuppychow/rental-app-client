import { shallowMount } from '@vue/test-utils';
import Bill from '@/components/Bill.vue';
import fixtures from './fixtures.js';

const factory = (props = {}) => shallowMount(Bill, {
  propsData: {
    ...props,
  },
});

const bill = fixtures.bills[0];
const property = fixtures.properties[0];

describe('Bill', () => {
  it('can load with props', () => {
    const wrapper = factory({ bill, property });

    assert.equal(wrapper.vm.bill.amount, 60);
    assert.equal(wrapper.vm.property.name, 'Zion');
  });

  it('method: processedDate', () => {
    const wrapper = factory({ bill, property });

    assert.equal(wrapper.vm.processedDate(), 'Sat Jun 30 2018');
  })
});
