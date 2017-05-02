import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import ElementTransition from './ElementTransition';
import {autobind_functions} from './autobind_functions';

/**
 * An object of type Element represents a drawn
 * element on the canvas. It describes the x and
 * y coordinate of the drawn element. The property
 * drawableShape is of type DrawableShape.
 * The element delegates the rendering/drawing request
 * including the canvas context to the drawable
 * shape.
 *
 * The width and height is defined by the passed
 * in drawable shape.
 */
class Element extends EventEmitter {

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

        autobind_functions(this);
    }

    /**
     * Add an element that the current element can transition
     * to. A new ElementTransition will be instantiated with
     * the current Element instance is the transitionSource
     * and the parameter ele is the transitionTarget.
     * @param {Element} ele
     */
    addTransitionTo(ele) {
        const elementTransition = new ElementTransition(this, ele);
        ele.transitionsFrom.push(elementTransition);
        this.transitionsTo.push(elementTransition);
    }

    /**
     * Add an element that the current element can transition
     * from.
     * @see addTransitionTo
     * @param {Element} ele
     */
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