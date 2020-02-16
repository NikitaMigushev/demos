var MyPoint = /** @class */ (function () {
    function MyPoint() {
    }
    MyPoint.prototype.draw = function () {
        //обратите внимание на то, что со свойством x мы работаем через this
        console.log('X is: ' + this.x);
        console.log('X is: ' + this.y);
    };
    MyPoint.prototype.getDistanceBtw = function (another) {
        //посчитать и вернуть расстояние
    };
    return MyPoint;
}());
