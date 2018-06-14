'use strict';

const Alexa = require('ask-sdk');
const request = require('request');

const BASE_URL = process.env.BASE_URL || 'https://localhost';
const url = `${BASE_URL}/ac`

async function putWithForm(form) {
  return new Promise((resolve, reject) => {
    request.put(url, { form }, (error, response, body) => {
      // body = { mode: 'dry', speed: 'auto', power: 'off', dir: 'auto', temp: 28 }
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
}

async function getACStatus() {
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      // body = { mode: 'dry', speed: 'auto', power: 'off', dir: 'auto', temp: 28 }
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
}

const LaunchRequestHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const speechText = 'Welcome to the air conditioner control, you can say power on!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('AC Control', speechText)
      .getResponse();
  },
};

const PowerOnIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PowerOn';
  },
  async handle(handlerInput) {
    const speechText = 'Powering on.';

    const acStatus = await putWithForm({ power: 'on' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const PowerOffIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PowerOff';
  },
  async handle(handlerInput) {
    const speechText = 'Powering off.';

    const acStatus = await putWithForm({ power: 'off' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeCoolIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeCool';
  },
  async handle(handlerInput) {
    const speechText = 'Changing to cool mode.';

    const acStatus = await putWithForm({ mode: 'cool' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeDryIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeDry';
  },
  async handle(handlerInput) {
    const speechText = 'Changing to dry mode.';

    const acStatus = await putWithForm({ mode: 'dry' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ModeHeatIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ModeHeat';
  },
  async handle(handlerInput) {
    const speechText = 'Changing to heat mode.';

    const acStatus = await putWithForm({ mode: 'heat' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const TempUpIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TempUp';
  },
  async handle(handlerInput) {
    const speechText = 'Turning up temperature.';

    const acStatus = await putWithForm({ temp: 'up' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const TempDownIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TempDown';
  },
  async handle(handlerInput) {
    const speechText = 'Turning down temperature.';

    const acStatus = await putWithForm({ temp: 'down' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const SpeedAutoIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SpeedAuto';
  },
  async handle(handlerInput) {
    const speechText = 'Setting speed to auto.';

    const acStatus = await putWithForm({ speed: 'auto' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const SpeedOneIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SpeedOne';
  },
  async handle(handlerInput) {
    const speechText = 'Setting speed to one.';

    const acStatus = await putWithForm({ speed: '1' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const SpeedTwoIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SpeedTwo';
  },
  async handle(handlerInput) {
    const speechText = 'Setting speed to two.';

    const acStatus = await putWithForm({ speed: '2' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const SpeedThreeIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SpeedThree';
  },
  async handle(handlerInput) {
    const speechText = 'Setting speed to three.';

    const acStatus = await putWithForm({ speed: '3' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionAutoIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionAuto';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to auto.';

    const acStatus = await putWithForm({ dir: 'auto' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionOneIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionOne';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to one.';

    const acStatus = await putWithForm({ dir: '1' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionTwoIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionTwo';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to two.';

    const acStatus = await putWithForm({ dir: '2' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionThreeIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionThree';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to three.';

    const acStatus = await putWithForm({ dir: '3' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionFourIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionFour';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to four.';

    const acStatus = await putWithForm({ dir: '4' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const DirectionFiveIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DirectionFive';
  },
  async handle(handlerInput) {
    const speechText = 'Setting direction to five.';

    const acStatus = await putWithForm({ dir: '5' });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  async handle(handlerInput) {
    const speechText = 'You can say power on, power off or cool mode and more!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('AC Control', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  async handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  async handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  async canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PowerOnIntentHandler,
    PowerOffIntentHandler,
    ModeDryIntentHandler,
    ModeCoolIntentHandler,
    ModeHeatIntentHandler,
    TempUpIntentHandler,
    TempDownIntentHandler,
    SpeedAutoIntentHandler,
    SpeedOneIntentHandler,
    SpeedTwoIntentHandler,
    SpeedThreeIntentHandler,
    DirectionAutoIntentHandler,
    DirectionOneIntentHandler,
    DirectionTwoIntentHandler,
    DirectionThreeIntentHandler,
    DirectionFourIntentHandler,
    DirectionFiveIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
)
  .addErrorHandlers(ErrorHandler)
  .lambda();
