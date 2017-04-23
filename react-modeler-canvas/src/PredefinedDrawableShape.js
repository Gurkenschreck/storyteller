/**
 * This file contains some predefines/example classes implementing
 * the DrawableShape class.
 */

import DrawableShape from './DrawableShape';

export class RectShape extends DrawableShape {

    constructor(width = 50, height = 50) {
        super(width, height);
    }

    drawSelf(context, x_e, y_e) {
        context.fillStyle = '#008fff';
        context.fillRect(x_e, y_e, this.width, this.height);
    }

}

export class CircleShape extends DrawableShape {

    constructor(width = 50, height = 50) {
        super(width, height);
    }

    drawSelf(context, x_e, y_e) {
        const radius = this.width / 2;
        const centerX = x_e + radius;
        const centerY = y_e + radius;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }

}

export default {
    RectShape,
    CircleShape
}