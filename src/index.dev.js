// @flow
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
import useGoogleAPI from './index';

const MyComponent = (): React.Node => {
  // eslint-disable-next-line no-undef
  const googleApi = useGoogleAPI(__GOOGLE_API_KEY__);
  const mapRef = React.useRef(null);
  const [mapInstance, setMapInstance] = React.useState(null);

  React.useEffect(() => {
    console.log('> first component');
    console.log(googleApi);
    if (googleApi.google === undefined) return;

    setMapInstance(
      new googleApi.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }),
    );
  }, [googleApi.google]);

  React.useEffect(() => {
    if (!mapInstance) {
      return;
    }

    mapInstance.setCenter({ lat: 45.91782, lng: 10.88685 });
  }, [mapInstance]);

  if (googleApi.error)
    return <div>An error occurred while loading the map.</div>;

  if (googleApi.google === undefined) return <div>loading...</div>;

  return (
    <div>
      loaded.
      <div
        style={{ height: 400, width: 400 }}
        id="map"
        ref={mapRef}
        data-testid="map"
      />
    </div>
  );
};

const MySecondComponent = (): React.Node => {
  // eslint-disable-next-line no-undef
  const googleApi = useGoogleAPI(__GOOGLE_API_KEY__);
  // console.log('>my component');
  // console.log(googleApi);
  const mapRef = React.useRef(null);
  const [mapInstance, setMapInstance] = React.useState(null);

  React.useEffect(() => {
    console.log('> first component');
    console.log(googleApi);
    if (googleApi.google === undefined) return;

    setMapInstance(
      new googleApi.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }),
    );
  }, [googleApi.google]);

  React.useEffect(() => {
    if (!mapInstance) {
      return;
    }

    mapInstance.setCenter({ lat: 45.91782, lng: 10.88685 });
  }, [mapInstance]);

  if (googleApi.error)
    return <div>An error occurred while loading the map.</div>;

  if (googleApi.google === undefined) return <div>loading...</div>;

  return (
    <div>
      loaded.
      <div
        style={{ height: 400, width: 400 }}
        id="map2"
        ref={mapRef}
        data-testid="map"
      />
    </div>
  );
}


const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <>
      <MyComponent />
      <MySecondComponent />
    </>
    , rootElement
  );
}

export default MyComponent;
