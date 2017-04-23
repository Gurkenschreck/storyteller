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

        this._onClick = this._onClick.bind(this);
        this.update = this.update.bind(this);
    }

    /* LIFECYCLE METHODS */
    componentDidMount() {
        this.update(this.refs.can);
    }

    /* CANVAS HANDLERS */

    /**
     * Handles the onClick event of the canvas element.
     * @param {MouseEvent} e The mouse event.
     */
    _onClick(e) {
        e.preventDefault();
        const canvas = this.refs.can;
        const {x_c, y_c} = getMousePosition(canvas, e);
        console.log(`Clicking here: x_c:${x_c} and y_c:${y_c}`);
        const elementsOnClick = this._findChildrenUnderClick(x_c, y_c);
        elementsOnClick.forEach(ele => {
            ele.onClick(e, x_c, y_c);
        });
        this.update(canvas); // Should be last action
    }

    /**
     * Creates a list of all elementss which are positioned under the click.
     * @param {number} x_c The x position of the click.
     * @param {number} y_c The y position of the click.
     */
    _findChildrenUnderClick(x_c, y_c) {
        return this.state.elements.filter(element => {
            return isClickInElementBoundaries(element, x_c, y_c);
        })
    }

    /**
     * Clears the canvas and triggers each element in the state
     * to redraw itself.
     * @param {canvas element} canvas The current canvas ref.
     * @param {string} contextType The contextType to use for drawing. Defaults to '2d'.
     */
    update(canvas, contextType = '2d') {
        clearCanvas(canvas, contextType);
        this.state.elements.forEach(e => {
            const context = canvas.getContext(contextType);
            e.render(context);
        })
    }

    render() {
        return (
            <div>
                <div>hello</div>
                <canvas ref="can" style={{backgroundColor: this.props.backgroundColor}}
                        width="800" height="500"
                        onClick={this._onClick}
                        onMouseMove={this._onMouseMove}>

                    Please use an updated browser that supports the HTML5 canvas element.
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;