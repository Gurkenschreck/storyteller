/**
 * Gets the mouse position relative to the canvas position.
 *
 * @param {canvas} The canvas object.
 * @param {MouseEvent} The mouse event.
 * @returns {{x, y}} The x and y position.
 */
export const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}