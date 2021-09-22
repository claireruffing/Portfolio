# Portfolio Website

To create a Portfolio showcasing my projects, skills, and experience. This is a Single Page Web App using React.js, Tailwind CSS, Sanity Studio, and Groc SQL, which is Sanity's SQL. I incorporated Sanity Studio to make it easier for me to manage the content of my portfolio. This site is hosted on AWS and automatically deploys whenever I push a new change to my Github repo. Sanity Studio also automatically deploys whenever I make a change on there. 

The link to the hosted site is at https://www.claireruffingportfolio.com/ and is hosted on AWS Amplify.

## Key Technologies

Frontend: React.js, Sanity Studio, Tailwind CSS, and AWS Amplify

## Principal Operations

For the pages Projects, Experience, and About Me on my site, there is an associated schema that contains the fields for each post I make in Sanity Studio. 

Projects Page: Each card you see on the projects page is an individual post that contains data following its schema. The fields in the schema consist of the title of the project, the date I finished it, the type, description, and a link to a new page with more information. When clicking on an individual card, you will be directed to a new page that has the title, author, and a bio consisting of the goal, key technologies, and principal operations.

Experience Page: Each card you see on the experience page is an individual post that contains data following its schema. The fields in the schema consist of the title of the position, the date I started to date I finished, the company, the location, and a description. 

About Me Page: The fields in the schema consist of information about the author of the site including the name, unique key, image, and bio.

Skills Page: Progress bars represent how good I am at the following programming languages and software tools I have gained experience in from school, work, and personal studying. The percents represent my skill at an intermediate level, not an expert level. 

## Amazon Web Services

The frontend code is continuously deployed whenever a commit is pushed to the this repo via AWS amplify (<https://aws.amazon.com/amplify/>).

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, to install the requirements run:

### `npm install`

Once everything is done installing, in the project directory run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
