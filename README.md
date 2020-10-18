# YA Google Maps React Library 

> A lightweight React hook-based library for a simple Google Maps API usage 

As [this article explains well](https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/), 
there is no official React library from Google for Google Maps, but there is a JS API Google Maps.

Adopting a library that allows using components like `<Map />` and its children `<Pinpoint />` `<Circle />` etc... 
helps us by the point of view of code readability, but with some drawbacks:

- You won't have full control of the API, or if you need it you'll probably find yourself into several workarounds;
- You heavily rely on the library;
- You add overhead;
- You can't use community help efficiently.

So, the goal of this library is *helping us to load the API via a _hook_* and have the 
*full control of Google Maps API*, even when we use JSX components for an easier development. 

This library does exactly that job: it loads google Maps API asynchronously, and it returns the google object. Period.

## Quickstart

First, install the library:

```shell
npm install --save ya-google-maps-react
```

## Automatically Lazy-loading Google API
The library includes a helper Hook that returns the Google maps API.

The `useGoogleApi` hook accepts:
- `key`: you *must* define it;
- `libraries`: an array of [libraries](https://developers.google.com/maps/documentation/javascript/libraries?hl=es-419) that you need to load. It defaults to `places`.

See [src/index.dev.js](src/index.dev.js) for a full example:
```javascript
import useGoogleAPI from './index';

// ...

const MyComponent = (): React.Node => {
  const googleApi = useGoogleAPI('MY-API-KEY-HERE');
  const mapRef = React.useRef(null);  

  // ...
  
  React.useEffect(() => {
    if (googleApi.google === undefined) return;

    setMapInstance(
      new googleApi.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      }),
    );
  }, [googleApi]);

  // ...
  if (googleApi.error)
    return <div>An error occurred while loading the map.</div>;
}
```

## Future evolution
- Some complementary components, in order to allow a fast development for simple cases, but with full control on the object.

## Issues?
If you have some issues, please make an issue on the issues tab and try to include an example.

## Contributing

```shell
git clone https://github.com/bertuz/ya-google-maps-react.git
cd ya-google-maps-react
npm install
make watch
```
___

## License
 [MIT](/LICENSE)
