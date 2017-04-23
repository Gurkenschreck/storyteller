import React, {Component, PropTypes} from 'react';
import Element from './Element';
import {
    clearCanvas,
    getMousePosition,
    isClickInElementBoundaries
} from './CanvasUtils';

export class EditorCanvas extends Component {

    static propTypes = {
        elements: PropTypes.arrayOf(Element),
        backgroundColor: PropTypes.string
    }

    static defaultProps = {
        elements: [],
        backgroundColor: '#ddd'
    }

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

        if(!this.dragged) {
            console.log(`Clicking here: x_c:${x_c} and y_c:${y_c}`);
            const elementUnderClick = this._findFirstChildUnderClick(x_c, y_c);
            elementUnderClick.onClick(e, x_c, y_c);
        } else {
            console.log(`Releasing here: x_c:${x_c} and y_c:${y_c}`, e);
        }

        delete this.dragged;
        delete this.draggingElement;
        delete this.dragging;
        delete this.oldMousePosX;
        delete this.oldMousePosY;

        this.update();
    }

    /**
     * Handle the onDoubleClick event of the canvas element.
     * @param {MouseEvent} e The MouseEvent for double click.
     */
    _onDoubleClick(e) {
        e.preventDefault();
        const canvas = this.refs.canvas;
        const {x_c, y_c} = getMousePosition(canvas, e);
        console.log(`Doubleclick`);
        const elementUnderClick = this._findFirstChildUnderClick(x_c, y_c);

        if(!elementUnderClick) {
            const newEle = new Element(x_c, y_c);
            const newElements = this.state.elements;
            newElements.push(newEle);
            this.setState({elements: newElements})
        } else {
            elementUnderClick.onDoubleClick(e, x_c, y_c);
        }
        this.update();
    }


    /**
     * Creates a list of all elementss which are positioned under the click.
     * @param {number} x_c The x position of the click.
     * @param {number} y_c The y position of the click.
     */
    _findChildUnterClick(x_c, y_c) {
        return this.state.elements.filter(element => {
            return isClickInElementBoundaries(element, x_c, y_c);
        })
    }

    _findFirstChildUnderClick(x_c, y_c) {
        return this.state.elements.find(element => {
            return isClickInElementBoundaries(element, x_c, y_c);
        })
    }

    /**
     * Clears the canvas and triggers each element in the state
     * to redraw itself.
     * @param {canvas element} canvas The current canvas ref.
     * @param {string} contextType The contextType to use for drawing. Defaults to '2d'.
     */
    update(contextType = '2d') {
        const canvas = this.refs.canvas;
        clearCanvas(canvas, contextType);
        this.state.elements.forEach(e => {
            const context = canvas.getContext(contextType);
            e.render(context);
        })
    }


    _onMouseDown(e) {
        e.preventDefault();
        console.log(`Mouse down`);
        const canvas = this.refs.canvas;
        const {x_c, y_c} = getMousePosition(canvas, e);

        const elementUnderClick = this._findFirstChildUnderClick(x_c, y_c);
        console.log(elementUnderClick);
        if(elementUnderClick) {
            this.dragging = true;
            this.draggingElement = elementUnderClick;
            this.oldMousePosX = x_c;
            this.oldMousePosY = y_c;
        }
    }

    _onMouseMove(e) {
        e.preventDefault();
        if(this.dragging) {
            this.dragged = true;
            console.log(`Dragging ${e}`);
            const canvas = this.refs.canvas;
            console.log(getMousePosition(canvas, e));
            const {x_c, y_c} = getMousePosition(canvas, e);
            this.draggingElement.x += -1 * (this.oldMousePosX - x_c);
            this.draggingElement.y += -1 * (this.oldMousePosY - y_c);
            this.oldMousePosX = x_c;
            this.oldMousePosY =y_c;
            this.update();
        }
    }

    render() {
        return (
            <div>
                <div>hello</div>
                <canvas ref="canvas" style={{backgroundColor: this.props.backgroundColor}}
                        width="800" height="500"
                        onClick={this._onClick}
                        onDoubleClick={this._onDoubleClick}
                        onMouseDown={this._onMouseDown}
                        onMouseMove={this._onMouseMove}>

                    Please use an updated browser that supports the HTML5 canvas element.
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;