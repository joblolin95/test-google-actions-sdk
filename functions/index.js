'use strict';

const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions



const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

exports.helloWorld = functions.https.onRequest((req, res) => {
  const app = new ActionsSdkApp({request: req, response: res});

  // Create functions to handle requests here
   function responseHandler (app) {
    // intent contains the name of the intent you defined in `initialTriggers`
    let intent = app.getIntent();
    switch (intent) {
      case app.StandardIntents.MAIN:
        app.ask('Welcome! Say a number.');
        break;

      case app.StandardIntents.TEXT:
        // let number = app.getArgument(NUMBER_ARGUMENT);
        // app.tell('You said ' + number);
        if (app.getRawInput() === 'bye') {
          app.tell('Goodbye!');
        } else {
        const inputPrompt = app.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
                                app.getRawInput() + '</say-as></speak>',
                                ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
        app.ask(inputPrompt);
        }
        break;
    }
  }
  
  // you can add the function name instead of an action map
  app.handleRequest(responseHandler);
});