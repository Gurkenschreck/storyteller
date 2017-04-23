/**
 * Clears a canvas.
 *
 * @param {canvas} canvas The canvas to clear.
 * @param {string} contextType The context type to use.
 */
export const clearCanvas = (canvas, contextType) => {
    const context = canvas.getContext(contextType);
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Gets the mouse position relative to the canvas position.
 *
 * @param {canvas} canvas The canvas object.
 * @param {MouseEvent} event The mouse event.
 * @returns {{x, y}} The x and y position.
 */
export const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x_c: event.clientX - rect.left,
        y_c: event.clientY - rect.top
    };
}


/**
 * Figures if the element was clicked on.
 * @param {Element} element The element to test.
 * @param {number} x_c The x position of the click.
 * @param {number} y_c The y position of the click.
 */
export const isClickInElementBoundaries = (element, x_c, y_c) => {
    const {x_e, y_e, h_e, w_e} = element.pos;
    return (
        ((x_e <= x_c) && (x_c <= (x_e + w_e)))
        && ((y_e <= y_c) && (y_c <= (y_e + h_e)))
    )
}