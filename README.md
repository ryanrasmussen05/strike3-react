# Strike3 2.0 (React)

NFL picking application.  Choose a different NFL team to win every week, you can only choose a team once all season.  Three strikes and you are out.

* React
* Redux
* Redux Saga
* Firebase
    * Auth
    * Hosting
    * Realtime Database
    * Cloud Functions

## Development server
* `npm start`
    * dev server at `http://localhost:3000/`

## Build
* `npm run build`
    * build production ready code in the `build` directory
    
## Lint
* `npm run lint`
    * check for lint error

## Deployment
* `npm run deploy` from project directory
    * deploys build direction to firebase hosting (shortcut for `firebase deploy --only hosting` command)
    
* `npm run deploy` from `functions` directory
    * deploys firebase cloud functions (shortcut for `firebase deploy --only functions` command)
