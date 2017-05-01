import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import {autobind_functions} from './../utils/autobind_functions';

class ActEditor extends Component {

    static propTypes = {
        act: PropTypes.object.isRequired,
        onActChange: PropTypes.func
    }

    static defaultProps = {
        onActChange: (act) => {}
    }

    constructor(props) {
        super(props);
        this.displayName = "ActEditor";
        this.state = {
            act: props.act
        }
        autobind_functions(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({act: nextProps.act});
    }

    _inputChange(event) {
        const newState = {...this.state};
        newState.act[event.target.name] = event.target.value;
        this.setState(newState);
        this.props.onActChange(newState.act);
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="titleGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Act title
                </Col>
                <Col sm={10}>
                    <FormControl type="text" name="title"
                    onChange={this._inputChange}
                    value={this.state.act.title} />
                </Col>
                </FormGroup>

                <FormGroup controlId="descriptionGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="textarea" name="description"
                    onChange={this._inputChange}
                    value={this.state.act.description} />
                </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default ActEditor;