/**
 * This file contains some predefines/example classes implementing
 * the DrawableShape class.
 */

import DrawableShape from './DrawableShape';

export class RectShape extends DrawableShape {

    width;
    height;

    constructor(width = 100, height = 100) {
        super();
        this.width = width;
        this.height = height;
    }

    drawSelf(context, x_e, y_e) {
        context.fillStyle = '#008fff';
        context.fillRect(x_e, y_e, this.width, this.height);
    }
}

export default {
    RectShape
}