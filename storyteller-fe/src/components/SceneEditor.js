import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import clonedeep from 'lodash.clonedeep';
import {autobind_functions} from './../utils/autobind_functions';

class SceneEditor extends Component {

    static propTypes = {
        scene: PropTypes.object.isRequired,
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    }

    static defaultProps = {
        onChange: (scene) => {},
        onBlur: (scene) => {}
    }

    bundledInputHandlers;

    constructor(props) {
        super(props);
        this.displayName = "SceneEditor";
        autobind_functions(this);
        
        this.state = {
            scene: clonedeep(props.scene)
        }

        this.bundledInputHandlers = {
            onChange: this._handleChange,
            onBlur: this._handleBlur
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this, nextProps);
        this.setState({scene: clonedeep(nextProps.scene)});
    }

    _handleChange(event) {
        const scene = this._updateState(event, () => {
            this.props.onChange(clonedeep(scene));
        });
    }

    _handleBlur(event) {
        const scene = this._updateState(event, () => {
            this.props.onBlur(clonedeep(scene));
        });
    }

    _updateState(event, callback) {
        const scene = clonedeep(this.state).scene;
        scene[event.target.name] = event.target.value;
        this.setState({scene}, callback);
        return scene;
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="titleGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Scene title
                </Col>
                <Col sm={10}>
                    <FormControl type="text" name="title"
                    value={this.state.scene.title}
                    {...this.bundledInputHandlers} />
                </Col>
                </FormGroup>

                <FormGroup controlId="descriptionGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="textarea" name="description"
                    value={this.state.scene.description} 
                    {...this.bundledInputHandlers} />
                </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default SceneEditor;