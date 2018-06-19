import firebase from 'firebase'; // imports firebase module

// this is needed to be run to give firebase 
// user creditials in order to talk to 
// database and the authentication server.
// process is the process creating the react build
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
});
// console.log(process.env.REACT_APP_API_KEY);