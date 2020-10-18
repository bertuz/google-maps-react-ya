// @flow
import { waitFor } from '@testing-library/dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('happy case, returned value', () => {
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
