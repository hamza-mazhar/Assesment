# Assesment

assesment

> create-react-app with a Node Express Backend and mysql

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally
Install [express](https://www.npmjs.com/package/express) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

To start the server (from the root of the project)

```
yarn server
```

To start the client (from the root of the project)

```
yarn client
```

Running the production build on localhost. This will create a production build, then Node will serve the app on http://localhost:8080

```
NODE_ENV=production yarn dev:server
```

## How this works

The key to use an Express backend with a project created with `create-react-app` is on using a **proxy**. We have a _proxy_ entry in `client/package.json`

```
"proxy": "http://localhost:8080/"
```

This tells Webpack development server to proxy our API requests to our API server, given that our Express server is running on **localhost:8080**
