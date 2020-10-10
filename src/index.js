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
): Promise<Object> => {
  return new Promise<Object>((resolve, reject) => {
    if (!window.google) {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = getUrl(key, url, version, libraries);

      // Below is important.
      // We cannot access google.maps until it's finished loading
      scriptTag.addEventListener('load', () => {
        resolve(window.google);
      });
      scriptTag.addEventListener('error', () => {
        reject();
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
};

// todo check it exists already with a warning!

const useGoogleApi = (key: string, libraries?: Array<string>): Object => {
  const [googleObject, setGoogleObject] = React.useState(null);

  createScriptTag(key, libraries)
    .then((loadedGoogleObject: Object) => {
      setGoogleObject(loadedGoogleObject);
    })
    .catch(() => {
      console.error('something went wrong when loading google API');
    });

  return googleObject;
};

export default useGoogleApi;
