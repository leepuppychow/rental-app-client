import Vue from 'vue';
import NavBar from '@/components/NavBar';

describe('NavBar.vue', () => {
  it('test existence methods', () => {
    expect(NavBar.data).to.be.a('function');
    expect(NavBar.methods.logout).to.be.a('function');
    assert.deepEqual(NavBar.data(), { addPropertyModalVisible: false })
  });

  it('can toggle addPropertyModal', () => {
    const vm = new Vue(NavBar).$mount();
    assert.equal(vm.addPropertyModalVisible, false);
    vm.toggleAddPropertyModal();
    assert.equal(vm.addPropertyModalVisible, true);
  });

  it('should render correct contents', () => {
    const Constructor = Vue.extend(NavBar);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.logout').textContent)
      .to.equal('Logout');
  });
});
