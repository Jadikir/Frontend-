/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    distanceToCenter() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    static vectorLength(a, b) {
        const deltaX = a.x - b.x;
        const deltaY = a.y - b.y;
        const deltaZ = a.z - b.z;
        return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {
    constructor(array = []){
        this.array = [...array];
        this.size = [...array].length || 0;
    }
    push(...element){
        this.array.push(...element)
        this.size = this.array.length;
    }
    pop(){
        if(this.array.length === 0){
            return undefined
        }
        else{
            const poppedElement = this.array.shift();
            this.size = this.array.length;
            return poppedElement;
        }
    }
    clear(){
        this.array = [];
        this.size = 0;
    }
    /**возвращает первый элемент в очереди**/
    front()
    {
        return this.array.length > 0 ? this.array[0] : undefined;
    }
    /**возвращает последний элемент в очереди**/
    back() {
        return this.array.length > 0 ? this.array[this.array.length - 1] : undefined;
    }
    /**возвращает по индексу элемент в очереди**/
    getAtIndex(index) {
        return this.array[index];
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};

