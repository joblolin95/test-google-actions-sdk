'use strict';

const functions = require('firebase-functions');
let test = require('./test.json');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const difficulties = ["easy", "medium", "hard"];

const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

exports.helloWorld = functions.https.onRequest((req, res) => {
  const app = new ActionsSdkApp({request: req, response: res});

  // Create functions to handle requests here
   function responseHandler (app) {
    // intent contains the name of the intent you defined in `initialTriggers`
    let intent = app.getIntent();
    switch (intent) {
      case app.StandardIntents.MAIN:
        const inputPrompt = app.buildInputPrompt(true, '<speak>Welcome to the O and M Trivia Game! Begin the game by choosing ' +
          'a difficulty. You may choose easy, medium, or hard</speak>',
                                ['I didn\'t hear a difficulty', 'If you\'re still there, what\'s the difficulty?', 'What is the difficulty?']);
        app.ask(inputPrompt);
        break;

      case app.StandardIntents.TEXT:
        // let number = app.getArgument(NUMBER_ARGUMENT);
        // app.tell('You said ' + number);
        if (app.getRawInput() === 'bye') {
          app.tell('Goodbye!');
        } else {
          const response = app.getRawInput();
          if(difficulties.indexOf(response) < 0){
            const inputPrompt = app.buildInputPrompt(true, '<speak>You said, ' +
                                response + '. Please select easy, medium, or hard</speak>',
                                ['I didn\'t hear a difficulty', 'If you\'re still there, what\'s the difficulty?', 'What is the difficulty?']);
            app.ask(inputPrompt);
          } else {
            const inputPrompt = app.buildInputPrompt(true, '<speak>You said, ' +
                                app.getRawInput() + '</speak>',
                                ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
            app.ask(inputPrompt);
          }
        }
        break;
    }
    console.log("Test %j", test);
    const inputPrompt = app.buildInputPrompt(true, '<speak>Does it work? </speak>',
    ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
    app.ask(inputPrompt);
  }
  
  // you can add the function name instead of an action map
  app.handleRequest(responseHandler);
});