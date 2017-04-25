import uuidV4 from 'uuid/v4';

/**
 * An object of type Element represents a drawn
 * elemnt in the canvas.
 */
class Element {

    uuid = uuidV4();
    x;
    y;
    w;
    h;
    drawableShape;
    onContextMenuCallback;
    onClickCallback;
    onDoubleClickCallback;

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
        this.x = x;
        this.y = y;

        this.w = drawableShape.width;
        this.h = drawableShape.height;
        this.drawableShape = drawableShape;

        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
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
        this.text = `Clickposition - x_c: ${x_c}; y_c: ${y_c}`;
        this.onClickCallback(this);
    }

    onDoubleClick() {
        this.onDoubleClickCallback(this);
    }

    onContextMenu() {
        this.onContextMenuCallback(this);
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