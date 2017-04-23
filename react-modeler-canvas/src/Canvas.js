import React, {Component, PropTypes} from 'react';
import Element from './Element';
import DragHandler from './DragHandler';
import {
    clearCanvas,
    getMousePosition,
    isClickInElementBoundaries
} from './CanvasUtils';

/**
 * Canvas to draw 2d elements.
 */
export class EditorCanvas extends Component {

    static propTypes = {
        elements: PropTypes.arrayOf(Element),
        backgroundColor: PropTypes.string
    }

    static defaultProps = {
        elements: [],
        backgroundColor: '#ddd'
    }

    _dragHandler;

    constructor(props) {
        super(props);

        this.state = {
            elements: props.elements
        }

        this.state.elements.push(new Element(10, 10, 200, 18));
        this.state.elements.push(new Element(50, 80, 200, 18));

        this._onClick = this._onClick.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this.update = this.update.bind(this);
    }

    /* LIFECYCLE METHODS */

    componentDidMount() {
        this._dragHandler = new DragHandler(this.refs.canvas)

        this.update();
    }

    /* CANVAS HANDLERS */

    /**
     * Handles the onClick event of the canvas element.
     * @param {MouseEvent} e The mouse event.
     */
    _onClick(e) {
        e.preventDefault();
        const canvas = this.refs.canvas;
        const {x_c, y_c} = getMousePosition(canvas, e);

        if(!this._dragHandler.wasDragged) {
            console.log(`Clicking here: x_c:${x_c} and y_c:${y_c}`);
            const elementUnderClick = this._findFirstChildUnderClick(x_c, y_c);
            if(elementUnderClick) {
                elementUnderClick.onClick(e, x_c, y_c);
            }
        } else {
            console.log(`Releasing here: x_c:${x_c} and y_c:${y_c}`, e);
        }

        this._dragHandler.handleDraggingReset();

        this.update();
    }

    _onDoubleClick(e) {
        e.preventDefault();
        const canvas = this.refs.canvas;
        const {x_c, y_c} = getMousePosition(canvas, e);
        console.log(`Doubleclick`);
        const clickedElement = this._findFirstChildUnderClick(x_c, y_c);

        if(clickedElement) {
            clickedElement.onDoubleClick(e, x_c, y_c);
        } else {
            this.addNewElement(x_c, y_c);
        }
        this.update();
    }

    _onMouseDown(e) {
        e.preventDefault();
        const {x_c, y_c} = getMousePosition(this.refs.canvas, e);
        const clickedElement = this._findFirstChildUnderClick(x_c, y_c);
        if(clickedElement) {
            this._dragHandler.handleDraggingForElement(clickedElement, x_c, y_c);
        }
    }

    _onMouseMove(e) {
        e.preventDefault();

        const canvas = this.refs.canvas;
        const {x_c, y_c} = getMousePosition(canvas, e);

        if(this._dragHandler.isDragging) {
            this._dragHandler.applyTransition(x_c, y_c);
            this.update();
        } else {
            const clickedElement = this._findFirstChildUnderClick(x_c, y_c);
            this._updateMouseCursor(clickedElement);
        }
    }

    /* CANVAS COMPONENT FUNCTIONS */

    /**
     * Created a new element and adds it to the state elements.
     * Does not rerender the canvas.
     * @param {number} posX The x position of the new element.
     * @param {number} posY The y position of the new element.
     */
    addNewElement(posX, posY) {
        const newEle = new Element(posX, posY);
        const newElements = this.state.elements;
        newElements.push(newEle);
        this.setState({elements: newElements});
    }

    /**
     * Clears the canvas and triggers each element in the state
     * to redraw itself.
     * @returns {undefined}
     */
    update() {
        const canvas = this.refs.canvas;
        clearCanvas(canvas, '2d');
        this.state.elements.forEach(e => {
            const context = canvas.getContext('2d');
            e.render(context);
        });
    }

    /* PRIVATE FUNCTIONS */

    /**
     * Finds the first element which is positioned under the click.
     * @param {number} x_c The x position of the click.
     * @param {number} y_c The y position of the click.
     * @private
     * @returns {Element} The found element.
     */
    _findFirstChildUnderClick(x_c, y_c) {
        return this.state.elements.find(element => {
            return isClickInElementBoundaries(element, x_c, y_c);
        });
    }

    /**
     * Updates the mouse cursor depending on the passed in element.
     * If the clicked element is present, the mouse cursor is set to
     * 'pointer'.
     * @param {Element} clickedElement Eventually a clicked element.
     */
    _updateMouseCursor(clickedElement) {

        if(clickedElement) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }

    render() {
        return (
            <div>
                <div>Hello</div>
                <canvas ref="canvas" style={{backgroundColor: this.props.backgroundColor}}
                        width="800" height="500"
                        onClick={this._onClick}
                        onDoubleClick={this._onDoubleClick}
                        onMouseDown={this._onMouseDown}
                        onMouseMove={this._onMouseMove}>

                    Please use an updated browser that supports the HTML5 canvas element.
                    Try creating an adventure using pen and paper...
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;