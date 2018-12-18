<!-- prettier-ignore-start -->

# Implementation Notes

Below is a brief overview of my design & implementation strategy

## UI

I solved the responsiveness [graphically in Sketch](https://scene.zeplin.io/project/5c130cd2c5dd4c508a2cf68f) then validated interaction with a [prototype in InVision](https://invis.io/J5PN8EM2AZP). There I defined necessary states for buttons & implemented them with CSS.

## Accessibility

Accessibility was a high priority when implementing this solution. I implemented the markup to deliver a pleasant UX to clients who browse with assistive tech. This semantic markup prvides the added benefit of an SEO boost. To that end I:

- Ordered html elements to provide a natural information flow & tab order. I then used CSS Flexbox rules to implement the visual order
- Used html5 semantic elements: nav, header, address...
- Used standards compliant Aria labels

## Additional Implementation Details

- Used [normalize.css](https://github.com/necolas/normalize.css/) to reset built-in styling for all browsers
- I used `::before` & `::after` pseudo-elements to attach icons via css instead of adding them to the markup markup







# Running project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can either use npm scripts below to launch project locally or [view the project in a code sandbox](https://codesandbox.io/s/vjrwwk36pl)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

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

<!-- prettier-ignore-end -->
