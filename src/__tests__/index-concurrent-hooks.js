// @flow
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('concurrency', () => {
  it('returns the same object if multiple hooks are requested while still loading, with no further script tags appended', async () => {
    expect.hasAssertions();

    const scriptElement = document.createElement('script');
    const createElementMock = jest.spyOn(document, 'createElement').mockReturnValueOnce(scriptElement);

    act(() => {
      const { result } = renderHook(
        () => {
          useGoogleApi('MY-API-KEY-HERE');
          useGoogleApi('MY-API-KEY-HERE');
        }
      );
    });


    // expect(result.current.google).toBeUndefined();
    expect(createElementMock).toHaveBeenCalledTimes(1);


    // await waitFor(() =>
    //   expect(document.getElementsByTagName('head')[0].children[0]).toBeTruthy(),
    // );
    //
    //
    // await waitFor(() => expect(result.current.google).toBeUndefined());
    // await waitFor(() => expect(result.current.error).toBe(error));
  });
});
