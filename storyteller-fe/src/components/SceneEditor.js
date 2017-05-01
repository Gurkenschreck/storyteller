import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import {autobind_functions} from './../utils/autobind_functions';

class SceneEditor extends Component {

    static propTypes = {
        scene: PropTypes.object.isRequired,
        onSceneChange: PropTypes.func
    }

    static defaultProps = {
        onSceneChange: (scene) => {}
    }

    constructor(props) {
        super(props);
        this.displayName = "SceneEditor";
        this.state = {
            scene: props.scene
        }
        autobind_functions(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({scene: nextProps.scene});
    }

    _inputChange(event) {
        const newState = {...this.state};
        newState.scene[event.target.name] = event.target.value;
        this.setState(newState);
        this.props.onSceneChange(newState.scene);
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
                    onChange={this._inputChange}
                    value={this.state.scene.title} />
                </Col>
                </FormGroup>

                <FormGroup controlId="descriptionGroup">
                <Col componentClass={ControlLabel} sm={2}>
                    Description
                </Col>
                <Col sm={10}>
                    <FormControl componentClass="textarea" name="description"
                    onChange={this._inputChange}
                    value={this.state.scene.description} />
                </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default SceneEditor;