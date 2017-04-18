import React, {Component, PropTypes} from 'react';

export class EditorCanvas extends Component {

    static propTypes = {
        elements: PropTypes.arrayOf(PropTypes.object)
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
            <div>hello</div>
        )
    }
}
export default EditorCanvas;