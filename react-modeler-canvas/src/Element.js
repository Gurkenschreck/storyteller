import uuidV4 from 'uuid/v4';
import ElementTransition from './ElementTransition';
import {EventEmitter} from 'events';

/**
 * An object of type Element represents a drawn
 * element in the canvas. IT defines the x and
 * y coordinate of the drawn element. The property
 * drawableShape is a property of type DrawableShape.
 * This element delegates the drawing request
 * including the canvas context to the drawable
 * shape.
 *
 * The width and height is defined by the passed
 * in drawable shape.
 */
class Element extends EventEmitter { // TODO extends EventEmitter?

    uuid = uuidV4();
    x;
    y;
    w;
    h;
    drawableShape;
    transitionsFrom = [];
    transitionsTo = [];

    /**
     * Get an object containing the position of
     * this elment.
     */
    get pos() {
        return {
            x_e: this.x,
            y_e: this.y,
            w_e: this.w,
            h_e: this.h
        }
    }

    constructor(
        x = 0,
        y = 0,
        drawableShape
    ) {
        super();
        this.x = x;
        this.y = y;

        this.w = drawableShape.width;
        this.h = drawableShape.height;
        this.drawableShape = drawableShape;

        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    addTransitionTo(ele) {
        const elementTransition = new ElementTransition(this, ele);
        ele.transitionsFrom.push(elementTransition);
        this.transitionsTo.push(elementTransition);
    }

    addTransitionFrom(ele) {
        const elementTransition = new ElementTransition(ele, this);
        ele.transitionsTo.push(elementTransition);
        this.transitionsFrom.push(elementTransition);
    }

    /**
     * Is called when the canvas detects a click, and
     * figures that this element is positioned under the
     * click.
     *
     * @param {MouseEvent} e The mouse event of onClick.
     * @param {number} x_c The x position of the click.
     * @param {number} y_c The y position of the click.
     */
    onClick(e, x_c, y_c) {
        this.emit('click', this);
    }

    onDoubleClick() {
        this.emit('doubleClick', this);
    }

    onContextMenu() {
        this.emit('contextMenu', this);
    }

    /**
     * Render is called when the eelement is first drawn or
     * an update on the canvas happened. The element should
     * render themseleves.
     * @param {canvas.getContext()} context The canvas context o draw on.
     */
    render(context) {
        this.drawableShape.drawSelf(context, this.x, this.y);
    }

}

export default Element;