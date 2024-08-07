import { mount } from '@vue/test-utils';
import Spinner from '../Spinner.vue';

describe('Spinner', () => {
  test('matches snapshot', () => {
    const wrapper = mount(Spinner);
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
