'use strict';

var keyCode = {
  enter: 13,
  esc: 27
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var setupUserNameField = setup.querySelector('.setup-user-name');
var setupSimular = setup.querySelector('.setup-similar');
var setupSimularList = setup.querySelector('.setup-similar-list');
var simularWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatColor = setup.querySelector('input[name="coat-color"]');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesColor = setup.querySelector('input[name="eyes-color"]');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballColor = setup.querySelector('input[name="fireball-color"]');
var wizardMockData = {
  numberOfWizards: 4,
  firstNames: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  lastNames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

function getRandomNumberFromRange(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function getRandomElementInArray(array) {
  return array[getRandomNumberFromRange(0, array.length - 1)];
}

function WizardEntity() {
  this.name = getRandomElementInArray(wizardMockData.firstNames) + ' ' + getRandomElementInArray(wizardMockData.lastNames);
  this.coatColor = getRandomElementInArray(wizardMockData.coatColors);
  this.eyesColor = getRandomElementInArray(wizardMockData.eyesColors);
}

function renderSimularWizard(entity) {
  var wizard = simularWizardTemplate.cloneNode(true);
  var name = wizard.querySelector('.setup-similar-label');
  var coat = wizard.querySelector('.wizard-coat');
  var eyes = wizard.querySelector('.wizard-eyes');

  name.textContent = entity.name;
  coat.style.fill = entity.coatColor;
  eyes.style.fill = entity.eyesColor;

  return wizard;
}

function renderSumilarWizards() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardMockData.numberOfWizards; i++) {
    var simularWizard = renderSimularWizard(new WizardEntity());
    fragment.appendChild(simularWizard);
  }
  setupSimularList.appendChild(fragment);
}

function openSetup() {
  setup.classList.remove('hidden');
  setupOpen.removeEventListener('click', onSetupOpenClick);
  setupOpenIcon.removeEventListener('keydown', onSetupOpenIconKeydown);
  setupClose.addEventListener('click', onSetupCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);
}

function closeSetup() {
  setup.classList.add('hidden');
  setupClose.removeEventListener('click', onSetupCloseClick);
  setupOpen.addEventListener('click', onSetupOpenClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onSetupOpenClick() {
  openSetup();
}

function onSetupOpenIconKeydown(evt) {
  if (evt.keyCode === keyCode.enter) {
    openSetup();
  }
}

function onSetupCloseClick() {
  closeSetup();
}

function onDocumentKeydown(evt) {
  if (evt.keyCode === keyCode.esc && document.activeElement !== setupUserNameField) {
    closeSetup();
  }
  if (evt.keyCode === keyCode.enter && document.activeElement === setupClose) {
    closeSetup();
  }
}

function onWizardCoatClick(evt) {
  evt.target.style.fill = getRandomElementInArray(wizardMockData.coatColors);
  wizardCoatColor.value = evt.target.style.fill;
}

function onWizardEyesClick(evt) {
  evt.target.style.fill = getRandomElementInArray(wizardMockData.eyesColors);
  wizardEyesColor.value = evt.target.style.fill;
}

function onWizardFireballClick(evt) {
  var color = getRandomElementInArray(wizardMockData.fireballColors);
  evt.target.style.backgroundColor = color;
  wizardFireballColor.value = color;
}

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpenIcon.addEventListener('keydown', onSetupOpenIconKeydown);
renderSumilarWizards();
setupSimular.classList.remove('hidden');


