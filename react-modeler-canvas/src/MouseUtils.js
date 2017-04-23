/**
 * Checks if the mouse click is the right mouse button.
 * @param {MouseEvent} event The dispatched mouse event.
 * @returns {boolean} If the event was tiggered through the right mouse button.
 */
export const isRightMouseButton = (event) => {
    var isRightMB = false;
    event = event || window.event;

    if ("which" in event)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = event.which == 3;
    else if ("button" in event)  // IE, Opera
        isRightMB = event.button == 2;

    return isRightMB;
}