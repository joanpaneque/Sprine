export default class Filter {
    constructor(spritePrototype) {
        this.spritePrototype = spritePrototype;
        this.opacity = 1;
    }

    setOpacity(value = 0.5) {
        this.spritePrototype.opacity = value;
        this.opacity = value;

        let imgData = getImageDataFromImage(this.spritePrototype._image);
        let data = imgData.data;

        return data;
    }
}

function getImageDataFromImage(image) {
    if (image.complete) {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return imageData;
    }
}