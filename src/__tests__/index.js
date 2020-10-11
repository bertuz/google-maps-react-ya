// @flow
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import React from 'react';
import ThisIsAnImportTest from '../index.dev';
import MyComponent from '../index.dev';

describe('matching cities to foods', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect.assertions(1);

    // render(ThisIsAnImportTest('google-key'))
    // const element = document.createElement('div');
    // expect(element).not.toBeNull();
    const element = document.createElement('div');
    element.id = 'root';
    document.getElementsByTagName('body')[0].appendChild(element);

    const rootElement = document.getElementById('root');
    if (rootElement) {
      ReactDOM.render(<MyComponent />, rootElement);
      const headScript = document
        .getElementsByTagName('head')[0]
        .children[0].getAttribute('src');
      expect(headScript).toMatch(
        'https://maps.googleapis.com/maps/api/js?key=MY-API-KEY-HERE&version=3.31&libraries=places',
      );
    }

    // expect.assertions(1);
    // expect(ThisIsAnImportTest('google-key')).toBe(true);
  });
});
