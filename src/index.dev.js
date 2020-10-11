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
    if (googleApi === null) return;

    setMapInstance(
      new googleApi.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }),
    );
  }, [googleApi]);

  React.useEffect(() => {
    if (!mapInstance) {
      return;
    }

    mapInstance.setCenter({ lat: 45.91782, lng: 10.88685 });
  }, [mapInstance]);

  if (googleApi == null) return <div>loading...</div>;

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
