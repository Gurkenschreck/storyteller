import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
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


    _handleChange(event) {
        const act = this._updateState(event, () => {
            this.props.onChange(act);
        });
        this.setState({act});
    }

    _handleBlur(event) {
        const act = this._updateState(event, () => {
            this.props.onBlur(act);
        });
        this.setState({act});
    }

    _updateState(event, callback) {
        const act = clonedeep(this.state).act;
        act[event.target.name] = event.target.value;
        this.setState({act}, callback);
        return act;
    }

    _renderPreview() {
        return (
            <div>
            a
                <Button onClick={(e) => this.setState({editing: true})}>Edit</Button>
            </div>
        )
    }

    _renderEditor() {
        const act = this.state.act;
        return (

            <div className="static-modal">
                <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{`Act ${act.abbreviation}: ${act.title}`}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <Col componentClass={ControlLabel} sm={2}>
                            Act title
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" name="title"
                            value={this.state.act.title}
                            {...this.bundledInputHandlers} />
                        </Col>

                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="textarea" name="description"
                            value={this.state.act.description}
                            {...this.bundledInputHandlers} />
                        </Col>
                    </Modal.Body>

                <Modal.Footer>
                    <Button onClick={(e) => this.setState({editing: false})}>Cancel</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }

    render() {
        if(this.state.editing) {
            return this._renderEditor();
        } else {
            return this._renderPreview();
        }
    }

}

export default ActEditor;