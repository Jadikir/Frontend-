const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it('добавление слова в словарь', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'яблоко');
            dic.addWord('cat', 'кот');

            assert.strictEqual(dic.getWord('apple'), 'яблоко');
            assert.strictEqual(dic.getWord('cat'), 'кот');
        });

        it('удаление слова из словаря', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'яблоко');
            dic.addWord('cat', 'кот');
            dic.deleteWord('apple');

            assert.strictEqual(dic.getWord('apple'), undefined);
            assert.strictEqual(dic.getWord('cat'), 'кот');
        });

        it('удаление несуществующего слова', () => {
            const dic = new core.Dictionary();
            dic.addWord('apple', 'яблоко');
            dic.addWord('cat', 'кот');
            dic.deleteWord('dog');

            assert.strictEqual(dic.getWord('apple'), 'яблоко');
            assert.strictEqual(dic.getWord('cat'), 'кот');
        });

        it('получение слова по несуществующему ключу возвращает undefined', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.getWord('123213123'), undefined);
        });
    });
});