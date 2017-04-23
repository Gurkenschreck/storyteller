import uuidV4 from 'uuid/v4';

/**
 * An object of type Element represents a drawn
 * elemnt in the canvas.
 */
class Element {

    uuid = uuidV4();
    x;
    y;
    width;
    height;

    /**
     * Get an object containing the position of
     * this elment.
     */
    get pos() {
        return {
            x_e: this.x,
            y_e: this.y,
            h_e: this.height,
            w_e: this.width
        }
    }

    constructor(
        x = 0, y = 0,
        width = 100, height = 18) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.text = 'Nothin was clicked yet, m8'
    }

    /**
     * Is called when the canvas detects a click, and
     * figures that this element is positioned under the
     * click. The element can react
     *
     * @param {MouseEvent} e The mouse event of onClick.
     * @param {number} x_c The x position of the click.
     * @param {number} y_c The y position of the click.
     */
    onClick(e, x_c, y_c) {
        console.log('Clicking ', x_c, y_c);
        this.text = `Clickposition - x_c: ${x_c}; y_c: ${y_c}`;
    }

    onDoubleClick(e, x_c, y_c) {
        console.log(`Double click on element`);
        this.text = `Doubleclicked!`;
    }

    /**
     * Render is called when the eelement is first drawn or
     * an update on the canvas happened. The element should
     * render themseleves.
     * @param {canvas.getContext()} context The canvas context o draw on.
     */
    render(context) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.font = '18pt Calibri';
        context.fillStyle = '#008fff';
        context.fillText(this.text, this.x, this.y+this.height);
    }
}

export default Element;