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

    render() {
        return (
            <div>
                <div>hello</div>
                <canvas>

                    Please use an updated browser that supports the HTML5 canvas element.
                </canvas>
            </div>
        )
    }
}
export default EditorCanvas;