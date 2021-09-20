// @flow
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('if the hook is used multiple times', () => {
  it('only loads once and returns the same shared loaded library object', async () => {
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

    const { result, rerender } = renderHook(() =>
      useGoogleApi('MY-API-KEY-HERE'),
    );

    rerender();

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

    jest.clearAllMocks();
  });
});
