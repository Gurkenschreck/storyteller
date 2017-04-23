
/**
 * The DrawableShape class manages the drawing on the
 * canvas. This shape defines how the element looks like
 * on the canvas.
 * A class extending the DrawableShape class MUST implement
 * the drawSelf function. This function is called inside
 * the render method of the Elemenent.
 */
class DrawableShape {

    width;
    height;

    constructor(width = 75, height = 75) {
        if (new.target === DrawableShape) {
           throw new TypeError("Cannot construct DrawableShape instances directly");
        }
        this.width = width;
        this.height = height;
    }

    /**
     * Draws the representation of the element on the canvas.
     * @param {object} context The canvas context to draw on.
     * @param {number} x_e The x coordinate of the element.
     * @param {number} y_e The y coordinate of the element.
     */
    drawSelf(context, x_e, y_e) {
        throw new Error('Element drawSelf not implemneted');
    }

}

export default DrawableShape;