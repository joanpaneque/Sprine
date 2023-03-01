export default class Random {
    static getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }
}