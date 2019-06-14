'use strict';

var NUMBER_OF_SIMILAR_CHARACTERS = 4;
var setup = document.querySelector('.setup');
var setupSimular = setup.querySelector('.setup-similar');
var setupSimularList = setup.querySelector('.setup-similar-list');
var simularCharactersProperty = [];
var simularCharacters = [];
var simularCharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var characterProperty = {
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
  var min = 0;
  var max = array.length - 1;
  return array[getRandomNumberFromRange(min, max)];
}

function SimularCharacter() {
  this.name = getRandomElementInArray(characterProperty.firstNames) + ' ' + getRandomElementInArray(characterProperty.lastNames);
  this.coatColor = getRandomElementInArray(characterProperty.coatColors);
  this.eyesColor = getRandomElementInArray(characterProperty.eyesColors);
}

function createSimularCharacterProperty() {
  simularCharactersProperty.push(new SimularCharacter());
}

function createSimularCharacter(property) {
  var character = simularCharacterTemplate.cloneNode(true);
  var characterName = character.querySelector('.setup-similar-label');
  var characterCoatColor = character.querySelector('.wizard-coat');
  var characterEyesColor = character.querySelector('.wizard-eyes');

  characterName.textContent = property.name;
  characterCoatColor.style.fill = property.coatColor;
  characterEyesColor.style.fill = property.eyesColor;

  simularCharacters.push(character);
}

function createSumilarCharacters() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_SIMILAR_CHARACTERS; i++) {
    createSimularCharacterProperty();
    createSimularCharacter(simularCharactersProperty[i]);
    fragment.appendChild(simularCharacters[i]);
  }

  setupSimularList.appendChild(fragment);
}

createSumilarCharacters();
setup.classList.remove('hidden');
setupSimular.classList.remove('hidden');


