import React, {Component, PropTypes} from 'react';
import Element from './Element';

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
    }

    _onClick(e) {
        e.preventDefault();
        console.log(e);
    }

    render() {
        return (
            <div>
                <div>hello</div>
                <canvas ref="can" onClick={this._onClick} width="800" height="500">

                    Please use an updated browser that supports the HTML5 canvas element.
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;