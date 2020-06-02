let data: number | string = 42;

interface ICar {
    color: string,
    speed: number
    topSpeed?: number
}

const car1: ICar = {
    speed: 100,
    color: "BMW"
}

const car2: ICar = {
    speed: 200,
    color: "Taxi"
}

function multiply(x: number , y: number) : string {
    let result: number = x * y;
    return result.toString();
}

export const cars = [car1, car2];