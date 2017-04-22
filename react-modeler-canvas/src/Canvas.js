import React, {Component, PropTypes} from 'react';
import Element from './Element';
import {getMousePosition} from './CanvasUtils';

export class EditorCanvas extends Component {

    static propTypes = {
        elements: PropTypes.arrayOf(Element)
    }

    static defaultProps = {
        elements: []
    }

    constructor(props) {
        super(props);

        this.state = {
            elements: props.elements
        }

        this._onClick = this._onClick.bind(this);
    }

    _onClick(e) {
        e.preventDefault();
        const {x, y} = getMousePosition(this.refs.can, e);
        this._writeMessage(this.refs.can, `Clickposition - x: ${x}; y: ${y}`)
    }

    _writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
    }

    render() {
        return (
            <div>
                <div>hello</div>
                <canvas ref="can" style={{backgroundColor: '#008fff'}} onClick={this._onClick} width="800" height="500">

                    Please use an updated browser that supports the HTML5 canvas element.
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;