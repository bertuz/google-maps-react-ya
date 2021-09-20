// @flow
import * as React from 'react';

const getUrl = (
  key: string,
  url: string = 'https://maps.googleapis.com/maps/api/js',
  version: string = '3.31',
  libraries: Array<string> = ['places'],
): string => {
  if (key === '') {
    throw new Error('You must pass an apiKey to use GoogleApi');
  }

  const queryStringParameters = {
    key,
    version,
    libraries: libraries.join(','),
  };

  const queryString = Object.keys(queryStringParameters)
    .filter((queryStringKey) => !!queryStringParameters[queryStringKey])
    .map(
      (queryStringKey) =>
        `${queryStringKey}=${queryStringParameters[queryStringKey]}`,
    )
    .join('&');

  return `${url}?${queryString}`;
};

const createScriptTag = (
  key: string,
  libraries?: Array<string>,
  url?: string,
  version?: string,
): Promise<Object|null> => {
  createScriptTag.loadingPromise = new Promise<Object>((resolve, reject) => {
    if (!window.google) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = getUrl(key, url, version, libraries);

      // Below is important.
      // We cannot access google.maps until it's finished loading
      scriptTag.addEventListener('load', () => {
        resolve(window.google);
      });
      scriptTag.addEventListener('error', (errorEvent: Object) => {
        reject(errorEvent);
      });

      const scriptParentElement =
        document.getElementsByTagName('head')[0] ??
        document.getElementsByTagName('body')[0];

      scriptParentElement.appendChild(scriptTag);
    } else {
      console.warn('Google API already loaded.');
      resolve(window.google);
    }
  });

  return createScriptTag.loadingPromise;
};

createScriptTag.loadingPromise = null;

type GoogleObject = {
  google?: Object,
  error?: Object,
  toBeLoaded: boolean
};

let isFirstHookCall: boolean = true;

const useGoogleApi = (key: string, libraries?: Array<string>): GoogleObject => {
  const [
    googleObject: GoogleObject | null,
    setGoogleObject: (googleObject: GoogleObject) => void,
  ] = React.useState({ });
  const [loaded, setLoaded]  = React.useState(false);

  if (!isFirstHookCall) {
    if(!loaded) {
      setLoaded(true);
      createScriptTag?.loadingPromise.then((loadedGoogleObject: Object|null) => {
        setGoogleObject({ google: loadedGoogleObject });
      })
      .catch((errorEvent: Object) => {
        setGoogleObject({ error: errorEvent });
      });
    }

    return googleObject;
  }

  isFirstHookCall = false;

  createScriptTag(key, libraries)
    .then((loadedGoogleObject: Object|null) => {
      setGoogleObject({ google: loadedGoogleObject });
    })
    .catch((errorEvent: Object) => {
      setGoogleObject({ error: errorEvent });
      console.error('something went wrong when loading google API');
    });

  return googleObject;
};

export default useGoogleApi;



