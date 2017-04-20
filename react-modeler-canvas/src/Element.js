import React, {Component, PropTypes} from 'react';
import uuidV4 from 'uuid/v4';

class Element extends Component {

    static propTypes = {
        uuid: PropTypes.string
    }

    static defaultProps = {
        uuid: uuidV4()
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>{this.props.uuid}</div>
        )
    }
}

export default Element;