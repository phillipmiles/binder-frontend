# Binder

Binder is a collaborative text editor web app. This repo holds the front-end code for the project. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A demo of the project can be view [here](http://binder-frontend.s3-website-ap-southeast-2.amazonaws.com/). A public test account can be logged in with with these user details...

Username: jim@demo.com 
Password: password

## Bugs/Issues
- Logining into an account, causing workspace nodes to be loaded, loginout of the account, logging into a DIFFERENT account will cause no Workspaces to show until a page refresh occurs.
- Registering an account works but is clunky as heck. It does not provide any helpful feedback to the user.

## Available Scripts

In the project directory, you can run:

### `npm install`
Download the project's npm dependencies by running `npm install` first.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npx cypress open`
Launches Cypress testing tool. This is the used testing tool for this project.

### `npm test`
Launches the test runner in the interactive watch mode.<br> 
The test runner used is Jest and is set as the default option for create-react-app. This
is left unused in this project.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).