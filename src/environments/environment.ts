// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:9191/api',

  // Disco SOAP Service Core
  docUrl: 'http://10.10.10.41:8181/doc', // url doc
  wsdlUrl: 'http://192.168.2.212:8080/wsa/disco', //url WSD
  targetNamespace: 'urn:reglement:reglement',
  method: 'wsdisco',
};
// http://192.168.2.212:8080/wsa/disco/wsdl