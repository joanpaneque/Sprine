var keys = {};

export default class Keyboard {

    static isKeyDown(key) {
        return keys[key] ?? false;
    }

}

export function initKeyboardEventListeners() {
    document.addEventListener("keydown", e => {
        keys[e.key] = true;
    });
    document.addEventListener("keyup", e => {
        keys[e.key] = false;
    });
}