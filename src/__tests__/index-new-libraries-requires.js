// @flow
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('if the hook is used multiple times', () => {
  it('returns an error in case it is required with new libraries', async () => {
    expect.hasAssertions();

    const headElement = document.createElement('head');
    const givenScriptElement = {
      addEventListener: () => {},
    };

    const headElementMockAppendChild = jest
      .spyOn(headElement, 'appendChild')
      .mockReturnValue(givenScriptElement);
    const getElementsByTagNameMock = jest
      .spyOn(document, 'getElementsByTagName')
      .mockReturnValue([headElement]);

    const createElementMock = jest
      .spyOn(document, 'createElement')
      .mockReturnValue(givenScriptElement);

    const expectedGoogleObject = { thisIsMyObject: {} };
    let givenResolvedCallbackToCall = () => {};

    const scriptElementAddEventListenerMock = jest
      .spyOn(givenScriptElement, 'addEventListener')
      .mockImplementation((param, passedCallback) => {
        if (param === 'load') {
          givenResolvedCallbackToCall = async () => {
            window.google = expectedGoogleObject;
            act(() => {
              passedCallback();
            });
          };
        }
      });

    const { result } = renderHook(() =>
      useGoogleApi('MY-API-KEY-HERE', ['geometry']),
    );

    const { result: secondResult } = renderHook(() =>
      useGoogleApi('MY-API-KEY-HERE', ['other-geometry']),
    );

    await expect(createElementMock).toHaveBeenCalledTimes(1);
    await expect(createElementMock).toHaveBeenLastCalledWith('script');

    await expect(getElementsByTagNameMock).toHaveBeenCalledTimes(1);
    await expect(getElementsByTagNameMock).toHaveBeenLastCalledWith('head');

    await expect(headElementMockAppendChild).toHaveBeenCalledTimes(1);
    await expect(headElementMockAppendChild).toHaveBeenLastCalledWith(
      givenScriptElement,
    );

    await expect(scriptElementAddEventListenerMock).toHaveBeenCalledTimes(2);
    expect(scriptElementAddEventListenerMock).toHaveBeenCalledWith(
      'load',
      expect.any(Function),
    );
    expect(scriptElementAddEventListenerMock).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );

    expect(result.current).toStrictEqual({});
    await act(async () => {
      await givenResolvedCallbackToCall();
    });
    expect(result.current).toHaveProperty('google');
    expect(result.current.google).toBe(expectedGoogleObject);

    expect(secondResult.current).not.toHaveProperty('google');
    expect(secondResult.current).toHaveProperty('error');
    expect(secondResult.current.error).toBe(
      'A new library required after requiring google maps the very first time: other-geometry. Impossible to be loaded, require it on the very first use of the hook.',
    );
    expect(secondResult.current).not.toHaveProperty('google');

    jest.clearAllMocks();
  });
});
