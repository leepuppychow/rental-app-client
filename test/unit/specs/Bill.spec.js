import { shallowMount } from '@vue/test-utils';
import BillRow from '@/components/BillRow.vue';
import fixtures from './fixtures.js';

const factory = (props = {}) => shallowMount(BillRow, {
  propsData: {
    ...props,
  },
});
const bill = fixtures.bills[0];
const property = fixtures.properties[0];

describe('BillRow', () => {
  let wrapper; 

  beforeEach(() => {
    wrapper = factory({ bill, property });
  });

  it('can load with props', () => {
    assert.equal(wrapper.vm.bill.amount, 60);
    assert.equal(wrapper.vm.property.name, 'Zion');
  });

  it('method: processedDate', () => {
    assert.equal(wrapper.vm.processedDate(), 'Sat Jun 30 2018');
  })
});
