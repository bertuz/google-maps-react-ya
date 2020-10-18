// @flow
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
import useGoogleAPI from './index';

const MyComponent = (): React.Node => {
  const googleApi = useGoogleAPI('MY-API-KEY-HERE');
  const mapRef = React.useRef(null);
  const [mapInstance, setMapInstance] = React.useState(null);

  React.useEffect(() => {
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

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<MyComponent />, rootElement);
}

export default MyComponent;
