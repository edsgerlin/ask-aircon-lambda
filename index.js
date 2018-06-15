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

const ChangePowerIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ChangePower';
  },
  async handle(handlerInput) {
    const oldACStatus = await getACStatus();
    const {intent} = handlerInput.requestEnvelope.request;
    const {slots} = intent;
    const power = slots.Power.value || 'on';
    if (power === oldACStatus.power) {
      const speechText = `Power is already ${power}.`;
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
    }
    await putWithForm({ power });
    let speechText = `Powering ${power}.`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};


const ChangeModeIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ChangeMode';
  },
  async handle(handlerInput) {
    const oldACStatus = await getACStatus();
    const oldMode = oldACStatus.mode;
    const acStatus = await putWithForm({ mode: 'whatever' });
    const newMode = acStatus.mode;
    const speechText = `Changing from ${oldMode} mode to ${newMode} mode.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ChangeTemperatureIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ChangeTemperature';
  },
  async handle(handlerInput) {
    const {intent} = handlerInput.requestEnvelope.request;
    const {slots} = intent;
    const temp = slots.Temperature.value || 'up';
    const oldACStatus = await getACStatus();
    const oldTemperature = oldACStatus.temp;
    const acStatus = await putWithForm({ temp });
    const temperature = acStatus.temp;
    const speechText = `Temperature changed from ${oldTemperature} to ${temperature}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ChangeSpeedIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ChangeSpeed';
  },
  async handle(handlerInput) {
    const oldACStatus = await getACStatus();
    const oldSpeed = oldACStatus.speed;
    const acStatus = await putWithForm({ speed: 'whatever' });
    const newSpeed = acStatus.speed;
    const speechText = `Changing speed from ${oldSpeed} to ${newSpeed}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const ChangeDirectionIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ChangeDirection';
  },
  async handle(handlerInput) {
    const oldACStatus = await getACStatus();
    const oldDirection = oldACStatus.dir;
    const acStatus = await putWithForm({ dir: 'whatever' });
    const newDirection = acStatus.dir;
    const speechText = `Changing direction from ${oldDirection} to ${newDirection}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText, speechText)
      .getResponse();
  },
};

const GetRoomTemperatureIntentHandler = {
  async canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetRoomTemperature';
  },
  async handle(handlerInput) {
    const acStatus = await getACStatus();
    const roomTemperature = acStatus.room_temp;
    const speechText = `Current room temperature is ${roomTemperature}°C.`;

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
    ChangePowerIntentHandler,
    ChangeModeIntentHandler,
    ChangeTemperatureIntentHandler,
    ChangeSpeedIntentHandler,
    ChangeDirectionIntentHandler,
    GetRoomTemperatureIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
)
  .addErrorHandlers(ErrorHandler)
  .lambda();
