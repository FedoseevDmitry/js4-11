/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';

// Записываем вводимые юзером значения
const userAnswers = [];
let userAttempts = null;
let botNumber = null;

// Проверяем нажатие кнопки отмены
function checkCancel(userNumber) {
  if (userNumber === null || userNumber === 0) {
    return true;
  }
  return false;
}

// Проверяем количество попыток
function checkAttemptCount() {
  if (userAttempts === 0) {
    return true;
  }
  return false;
}

// Проверяем значения вводимые пользователем
function checkUserInput(userNumber) {
  if (userNumber < botNumber) {
    return alert(`Загаданное число больше!`);
  } if (userNumber > botNumber) {
    return alert(`Загаданное число меньше!`);
  } if (userNumber === botNumber) {
    return true;
  }
  return false;
}

// Основная форма вызова игры и проверки ввода
const gameFunc = (startRange, endRange) => {
  const userNumber = Number(prompt(
      `Я загадал число от ${startRange} до ${endRange}. Угадаешь? ` +
      `Осталось попыток - ${userAttempts}`));

  if (checkCancel(userNumber)) {
    alert('Вы завершили игру.');
    return;
  }

  if (checkAttemptCount()) {
    alert(`Попытки закончились. Вы проиграли. Загаданное число было` +
    ` ${botNumber}.`);
    return;
  }

  if (checkUserInput(userNumber)) {
    alert(`Поздравляю, вы угадали!`);
    return;
  }

  if (!userAnswers.includes(userNumber)) {
    userAnswers.push(userNumber);
    userAttempts--;
    return gameFunc(startRange, endRange);
  } else {
    alert('Вы уже вводили это число, попытка не сгорает.');
    return gameFunc(startRange, endRange);
  }
};

// Вписываем изначальные данные в массив для ответов
const defaultSettings = (startRange, endRange) => {
  userAnswers.push(startRange);
  userAnswers.push(endRange);
  userAttempts = Math.floor((endRange - startRange) * 0.3);
  botNumber = Math.floor(Math.random() * (endRange - startRange + 1)) +
  startRange;

  gameFunc(startRange, endRange);
};

defaultSettings(Number(prompt('Укажите первое число:')),
    Number(prompt('Укажите второе число:')));
