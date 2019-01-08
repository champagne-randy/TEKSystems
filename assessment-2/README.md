# Implementation Notes

Below is a brief overview of my design & implementation strategy


## Component architecture

I separated state & handlers concerns from presentational ones [according to best practices](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). This to increase modularity making it easy to integrate this component. I also integrated TypeScript to provide granular type-checking and avoid runtime bugs. I also added [logic to cancel pending Ajax promises when component gets unmounted](https://itnext.io/working-with-axios-and-rxjs-to-make-simple-ajax-service-module-6fda9ecdaf9f). This will help avoid memory leaks.


## State Management

Here I intentionally only used React to manage form state [per best practices](https://github.com/reduxjs/redux/issues/1287#issuecomment-175351978). I also added localStorage support to cache form state on submit as requested. The submit handler is modular giving us the option to swap out axios for apollo to speak to a GraphQL backend.


## Styling

- I used [Styled Components](http://getbem.com/introduction/) as requested in order to keep style rules modular. I implemented the necessary config to SC wired up with TypeScript and also investigated workaround the a bug in the SC type definitions in the latest version.
- Grid layout powered by Flexbox. Keeps styling easy to reason about
- You'l notice I wrapped control groups in `<div role="group>` elements instead of `<fieldset>`. [There's known bug that}(https://stackoverflow.com/a/28078860) that makes `display: flex` not work on `<fieldset>`s or `<legend>`s. Setting the role should help assistive devices understand the grouping


## Testing

Although current test coverage is only around %60, my strategy to isolated structural (smoke) tests from behavior-driven ones will allow the test suite to evolve independently along both paths. This is a critical area I would focus on next.





# Running project
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can either use npm scripts below to launch project locally or [view the project in a code sandbox](https://codesandbox.io/s/myp1r45mq9)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the front-end app in the development mode and also launches [json-server as a mock backend](https://github.com/typicode/json-server).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test:watch`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
