// @flow
import { waitFor } from '@testing-library/dom';
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

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
