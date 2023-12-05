"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const [lastName, firstName] = fio.split(' ').filter(Boolean);
    return `${firstName} ${lastName}`;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return [...new Set(array)];
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if (array.length === 0) {
        return 0;
    }

    const maxSalary = Math.max(...array);
    const minSalary = Math.min(...array);

    if (minSalary === 0) {
        return Infinity;
    }

    return maxSalary / minSalary;
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.wordMap = new Map();
    }
    addWord(key, value) {
        if (typeof key === 'string' && typeof value === 'string') {
            this.wordMap.set(key, value);
        } else {
            throw new Error('Both keys and values must be non-null strings');
        }
    }

    getWord(key) {
        return this.wordMap.get(key);
    }

    deleteWord(key) {
        this.wordMap.delete(key);
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
