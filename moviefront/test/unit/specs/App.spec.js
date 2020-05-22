import Vue from 'vue';
import App from '@/App';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import { mount } from '@vue/test-utils';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueRouter);

describe('App.vue', () => {
  let store;
  const router = new VueRouter();
  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
    });
  });

  it('the page should render(no functionability included)', () => {
    const wrapper = mount(App, { store, router, Vue });
    expect(wrapper.exists()).toBe(true);
  });
});
