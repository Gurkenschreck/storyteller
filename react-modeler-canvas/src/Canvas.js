import React, {Component, PropTypes} from 'react';
import Element from './Element';
import DrawableShape from './DrawableShape';
import DragHandler from './DragHandler';
import {
    clearCanvas,
    getMousePosition,
    isClickInElementBoundaries
} from './CanvasUtils';
import {
    isRightMouseButton
} from './MouseUtils';

/**
 * Canvas to draw 2d elements.
 *
 * The react reference to the HTML5 canvas element is called
 * 'canvas'. The EditorCanvas makes use of CanvasUtils and the
 * DragHandler which, surprise surprise, handles the dragging
 * of a element.
 */
export class EditorCanvas extends Component {

    static propTypes = {
        elements: PropTypes.arrayOf(Element),

        /* Canvas properties */
        id: PropTypes.string,
        backgroundColor: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object,

        /* Canvas handler */
        onContextMenu: PropTypes.func,
        onElementCreated: PropTypes.func,

        /* Element handler */
        newElementShape: PropTypes.func.isRequired,
        onElementClick: PropTypes.func.isRequired,
        onElementDoubleClick: PropTypes.func.isRequired,
        onElementContextMenu: PropTypes.func
    }

    static defaultProps = {
        elements: [],

        /* Canvas properties */
        id: '',
        backgroundColor: '#ddd',
        width: 800,
        height: 500,
        style: {},

        /* Canvas handler */
        onContextMenu: (event) => {},
        onElementCreated: (newElement) => {},

        /* Element handler */

        newElementShape: () => { throw new Error('newElementShape was not passed.')},
        onElementDoubleClick: (element) => { throw new Error('onElementDoubleClick was not passed.')},
        onElementContextMenu: (element) => {}
    }

    _dragHandler;

    constructor(props) {
        super(props);

        this.state = {
            elements: props.elements
        }

        this._onClick = this._onClick.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onContextMenu = this._onContextMenu.bind(this);
        this.update = this.update.bind(this);
        this._getClickPosition = this._getClickPosition.bind(this);
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
        const {x_c, y_c} = this._getClickPosition(e);

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
        console.log(`Doubleclick`);

        const {x_c, y_c} = this._getClickPosition(e);
        const clickedElement = this._findFirstChildUnderClick(x_c, y_c);

        if(clickedElement) {
            clickedElement.onDoubleClick();
        } else {
            const newElement = this.addNewElement(x_c, y_c);
            this.props.onElementCreated(newElement);
        }
        this.update();
    }

    _onMouseDown(e) {
        e.preventDefault();
        if(isRightMouseButton(e)) {
            return;
        }
        const {x_c, y_c} = this._getClickPosition(e);
        const clickedElement = this._findFirstChildUnderClick(x_c, y_c);
        if(clickedElement) {
            this._dragHandler.handleDraggingForElement(clickedElement, x_c, y_c);
        }
    }

    _onMouseMove(e) {
        e.preventDefault();
        const {x_c, y_c} = this._getClickPosition(e);

        if(this._dragHandler.isDragging) {
            this._dragHandler.applyTransition(x_c, y_c);
            this.update();
        } else {
            const clickedElement = this._findFirstChildUnderClick(x_c, y_c);
            this._updateMouseCursor(clickedElement);
        }
    }

    _onContextMenu(e) {
        e.preventDefault();
        const {x_c, y_c} = this._getClickPosition(e);
        const clickedElement = this._findFirstChildUnderClick(x_c, y_c);
        if(clickedElement) {
            this.props.onElementContextMenu(clickedElement);
        } else {
            this.props.onContextMenu();
        }
    }

    /* CANVAS COMPONENT FUNCTIONS */

    /**
     * Created a new element and adds it to the state elements.
     * Does not rerender the canvas.
     * @param {number} posX The x position of the new element.
     * @param {number} posY The y position of the new element.
     * @returns {Element} The new element.
     */
    addNewElement(posX, posY) {
        const newEle = new Element(posX, posY, new this.props.newElementShape());
        newEle.onContextMenuCallback = this.props.onElementContextMenu;
        newEle.onClickCallback = this.props.onElementClick;
        newEle.onDoubleClickCallback = this.props.onElementDoubleClick;
        const newElements = this.state.elements;
        newElements.push(newEle);
        this.setState({elements: newElements});
        return newEle;
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
     * Calculates the mouse position relative to the canvas.
     * @param {MouseEvent} e The mouse event to read the mouse position from.
     */
    _getClickPosition(e) {
        const canvas = this.refs.canvas;
        return getMousePosition(canvas, e);
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
                <canvas ref="canvas"
                        id={this.props.id}
                        style={this.props.style}
                        width={this.props.width}
                        height={this.props.height}
                        onClick={this._onClick}
                        onDoubleClick={this._onDoubleClick}
                        onMouseDown={this._onMouseDown}
                        onMouseMove={this._onMouseMove}
                        onContextMenu={this._onContextMenu}>

                    Please use an updated browser that supports the HTML5 canvas element.
                    Try creating an adventure using pen and paper...
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;