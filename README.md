# team-crux-eo
An application for Employment Options vocational rehabilitation program


# Dev Setup Instructions

Make sure to run `npm install` at the top level of the project, and if you're working on the front-end, change directories to `client/` and run `npm install` again.

To fire up the server locally for development, you can run <code>npm run dev</code> and that should start the main Express server and the mini front-end server that will serve up the React application.

To run in production, create a public directory and <code>npm run build</code>, and <code>npm run production</code>

Before running these, you should make sure that ports 3000 and 3001 are available for these to run on.

You can find a description of how those are working [here](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/).
