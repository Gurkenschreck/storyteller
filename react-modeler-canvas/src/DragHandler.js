import {
    clearCanvas,
    getMousePosition,
    isClickInElementBoundaries
} from './CanvasUtils';
import {autobind_functions} from './autobind_functions';

/**
 * The DragHandler manages the dragging functionality
 * of the canvas elements.
 */
class DragHandler { // TODO change DragHandler to MouseHandler with events?

    canvas;
    isDragging = false;
    wasDragged = false;
    draggingElement;
    oldMousePosX;
    oldMousePosY;

    constructor(canvas) {
        this.canvas = canvas,
        autobind_functions(this);
    }

    /**
     * Sets the element to handle the dragging for.
     * @param {MouseEvent} e The mouse event.
     * @param {Element} element The element to drag.
     */
    handleDraggingForElement(element, x_c, y_c) {
        this.isDragging = true;
        this.draggingElement = element;
        this.oldMousePosX = x_c;
        this.oldMousePosY = y_c;
    }

    /**
     * Changes the position of the element.
     * Is called inside onMouseMove of the canvas.
     * @param {number} x_c The new x mouse position after mouse movement.
     * @param {number} y_c The new y mouse position after mouse movement.
     */
    applyTransition(x_c, y_c) {
        this.wasDragged = true;
        this.draggingElement.x += -1 * (this.oldMousePosX - x_c);
        this.draggingElement.y += -1 * (this.oldMousePosY - y_c);
        this.oldMousePosX = x_c;
        this.oldMousePosY =y_c;
    }

    /**
     * Resets the internal state of the drag handler.
     * Releases the element.
     */
    handleDraggingReset() {
        this.wasDragged = false;
        this.isDragging = false;
        delete this.draggingElement;
        delete this.oldMousePosX;
        delete this.oldMousePosY;
    }

}

export default DragHandler;