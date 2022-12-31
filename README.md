# Overview

Find the deployed project [here](https://customer-ticket-manager.web.app/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Basic React Firebase project for managing Customer Tickets.

Login as a customer or support agent, view list of tickets and take action on them.

Supports real-time chat on the ticket


## Supported use cases as customer

Login to portal or signup as new customer

View Summary of created older tickets (open/closed/all)

View list of tickets

Open any ticket and view details of that

Create Journal entries

Chat in real-time with support agent

## Supported use cases as support agent

Login to portal as support agent

View summary of all open customer tickets

View list of open customer tickets

Assign open tickets to self

Create Journal entries and provide resolution to the customer

Chat in real-time with customer

### Create firebase project

1. Create firebase project.
2. Copy the configurations in .env file with following properties.

REACT_APP_FIREBASE_API_KEY

REACT_APP_FIREBASE_AUTH_DOMAIN

REACT_APP_FIREBASE_PROJECT_ID

REACT_APP_FIREBASE_STORAGE_BUCKET

REACT_APP_FIREBASE_MESSAGING_SENDER_ID

REACT_APP_FIREBASE_APP_ID

REACT_APP_FIREBASE_MEASUREMENT_ID

3. Add firestore to your project

4. Add following collections to your firestore 

accessControl

companies

roles

tickets

userDetails

### Run the project

Run `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
