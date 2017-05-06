import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import clonedeep from 'lodash.clonedeep';
import {autobind_functions} from './../utils/autobind_functions';

/**
 * Takes an object of type Act and provides
 * input elements to change the properties
 * of the act.
 * Does not mutate the passed in act directly, so
 * a handler must be passed in.
 */
class ActEditor extends Component {

    static propTypes = {
        act: PropTypes.object.isRequired,
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    }

    static defaultProps = {
        onChange: (act) => {},
        onBlur: (act) => {}
    }

    bundledInputHandlers;

    constructor(props) {
        super(props);
        this.displayName = "ActEditor";
        autobind_functions(this);

        this.state = {
            act: props.act,
            editing: false
        }

        this.bundledInputHandlers = {
            onChange: this._handleChange,
            onBlur: this._handleBlur
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({act: nextProps.act});
    }

    _handleChange(event) {
        const act = this._updateState(event, () => {
            this.props.onChange(act);
        });
    }

    _handleBlur(event) {
        const act = this._updateState(event, () => {
            this.props.onBlur(act);
        });
    }

    _updateState(event, callback) {
        const act = clonedeep(this.state).act;
        act[event.target.name] = event.target.value;
        this.setState({act}, callback);
        return act;
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
                    value={this.state.act.title}
                    disabled={this.state.editing}
                    {...this.bundledInputHandlers} />
                </Col>
                </FormGroup>

                <FormGroup controlId="descriptionGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="textarea" name="description"
                    value={this.state.act.description}
                    disabled={this.state.editing}
                    {...this.bundledInputHandlers} />
                </Col>
                </FormGroup>
                <button onClick={(e) => this.setState({editing: true})}>Edit</button>
                <button onClick={(e) => this.setState({editing: false})}>Save</button>
            </Form>
        );
    }

}

export default ActEditor;