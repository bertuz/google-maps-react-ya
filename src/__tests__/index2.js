// @flow
import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('happy case, returned value', () => {
  it('adds the header with the expected URL', async () => {
    expect.hasAssertions();
    const { result } = renderHook(() =>
      useGoogleApi('MY-API-KEY-HERE', ['places']),
    );
    expect(result.current.google).toBeUndefined();

    await waitFor(() =>
      expect(document.getElementsByTagName('head')[0].children[0]).toBeTruthy(),
    );

    const headScript = document
      .getElementsByTagName('head')[0]
      .children[0].getAttribute('src');
    expect(headScript).toMatch(
      'https://maps.googleapis.com/maps/api/js?key=MY-API-KEY-HERE&version=3.31&libraries=places',
    );
  });
});
