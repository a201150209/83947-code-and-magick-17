'use strict';

var setup = document.querySelector('.setup');
var setupSimular = setup.querySelector('.setup-similar');
var setupSimularList = setup.querySelector('.setup-similar-list');
var simularCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
  var wizard = simularCharacterTemplate.cloneNode(true);
  var wizardName = wizard.querySelector('.setup-similar-label');
  var wizardCoatColor = wizard.querySelector('.wizard-coat');
  var wizardEyesColor = wizard.querySelector('.wizard-eyes');

  wizardName.textContent = entity.name;
  wizardCoatColor.style.fill = entity.coatColor;
  wizardEyesColor.style.fill = entity.eyesColor;

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

renderSumilarWizards();
setup.classList.remove('hidden');
setupSimular.classList.remove('hidden');


