type GoogleObject = {
  google?: Object;
  error?: Object;
};

export declare const useGoogleApi: (
  key: string,
  libraries?: Array<string>,
) => GoogleObject;

export default useGoogleApi;
