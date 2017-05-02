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
        
        // TODO make state an immutable-js obj?
        this.state = {
            act: clonedeep(props.act)
        }

        this.bundledInputHandlers = {
            onChange: this._handleChange,
            onBlur: this._handleBlur
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({act: clonedeep(nextProps.act)});
    }

    _handleChange(event) {
        // TODO use immutablejs
        const act = this._updateState(event);
        this.props.onChange(act);
    }

    _handleBlur(event) {
        const act = this._updateState(event);
        this.props.onBlur(act);
    }

    _updateState(event) {
        const act = clonedeep(this.state).act;
        act[event.target.name] = event.target.value;
        this.setState({act});
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
                    {...this.bundledInputHandlers} />
                </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default ActEditor;