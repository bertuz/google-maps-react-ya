// @flow
import { waitFor } from '@testing-library/dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('happy cases', () => {
  it('adds the header with the expected URL', async () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useGoogleApi('MY-API-KEY-HERE'));
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

  it('returns the loaded object once loaded', async () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useGoogleApi('api'));
    expect(result.current.google).toBeUndefined();

    await waitFor(() =>
      expect(document.getElementsByTagName('head')[0].children[0]).toBeTruthy(),
    );

    await act(async () => {
      window.google = {
        maps: {
          Map() {},
        },
      };
      const event = new Event('load');

      document.getElementsByTagName('head')[0].children[0].dispatchEvent(event);
    });

    await waitFor(() => expect(result.current.google).toBe(window.google));
    await waitFor(() => expect(result.current.error).toBeUndefined());
  });
});

describe('bad cases', () => {
  it('returns the error object', async () => {
    expect.hasAssertions();

    const scriptElement = document.createElement('script');
    jest.spyOn(document, 'createElement').mockReturnValueOnce(scriptElement);

    const { result } = renderHook(() => useGoogleApi('MY-API-KEY-HERE'));
    expect(result.current.google).toBeUndefined();

    await waitFor(() =>
      expect(document.getElementsByTagName('head')[0].children[0]).toBeTruthy(),
    );

    const error = new Event('error');
    await act(async () => {
      scriptElement.dispatchEvent(error);
    });

    await waitFor(() => expect(result.current.google).toBeUndefined());
    await waitFor(() => expect(result.current.error).toBe(error));
  });
});
