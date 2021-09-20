// @flow
import { renderHook, act } from '@testing-library/react-hooks';
import useGoogleApi from '../index';

describe('if the hook is used multiple times', () => {
  it('returns the same shared error object in case it loads badly', async () => {
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

    const expectedGoogleObject = { error: {} };
    let givenRejectedCallbackToCall = () => {};

    const scriptElementAddEventListenerMock = jest
      .spyOn(givenScriptElement, 'addEventListener')
      .mockImplementation((param, passedCallback) => {
        if (param === 'error') {
          givenRejectedCallbackToCall = async () => {
            act(() => {
              passedCallback(expectedGoogleObject);
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
      await givenRejectedCallbackToCall();
    });
    expect(result.current).toHaveProperty('error');
    expect(result.current.error).toBe(expectedGoogleObject);
  });
});
