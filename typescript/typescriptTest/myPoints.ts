class MyPoint {
  x: number;
  y: string;
  draw() {
    //обратите внимание на то, что со свойством x мы работаем через this
    console.log('X is: ' + this.x);
    console.log('X is: ' + this.y);
  }
  getDistanceBtw(another: AnotherPoint) {
    //посчитать и вернуть расстояние
  }
}

let myPoint = new MyPoint() //MyPoint - это имя класса
myPoint.x = 2;              //устанавливаем свойство x 
myPoint.y = "a";            //устанавливаем свойство y

myPoint.draw();             //вызываем метод draw
