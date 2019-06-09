import React from 'react';
import ErrorBoundary from '..';
import { shallow, mount } from 'enzyme';

describe('ErrorBoundary', () => {
  it('should normally render the children', () => {
    const AnyComponent = () => <h1>My App</h1>;
    const wrapper = shallow(
      <ErrorBoundary FallbackComponent={<div>Oops</div>}>
        <AnyComponent />
      </ErrorBoundary>,
    );
    expect(wrapper.equals(<AnyComponent />)).toBeTruthy();
  });
  it('should normally render the FallbackComponent if error is caught in children', () => {
    const ComponentWithError = () => {
      throw Error('Unknown Error');
    };
    const FallbackComponent = () => <div>Oops</div>;

    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    const wrapper = mount(
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ComponentWithError />
      </ErrorBoundary>,
    );

    console.error.mockRestore();
    expect(wrapper.children().is(FallbackComponent)).toBeTruthy();
  });
});
