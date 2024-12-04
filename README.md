# Web frontend for midjourney wallpaper scraper

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This assumes a working socket-io webserver on the same host/port. Running the app standalone you will need to manually select a different url

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### When building for a remote webserver

Useful to build without toolchain locally, and/or to a different output path

```sh
podman build -f ci/Dockerfile -t midjourney_ui_builder
podman run -it -v /path/to/result:/app/build midjourney_ui_builder:/app/public midjourney_ui_builder
```
