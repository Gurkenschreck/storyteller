import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import ActEditor from './../components/ActEditor';
import SceneEditor from './../components/SceneEditor';
import Act from './../domain/Act';
import Scene from './../domain/Scene';
import ActCanvasConnector from './../domain/ActCanvasConnector';
import {autobind_functions} from './../utils/autobind_functions';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';

        this.state = {
            currentActUUID: '',
            currentSceneUUID: '',
            actCanvasConnectors: []
        }

        autobind_functions(this);
    }

    /* react-modeler-canvas callbacks */
    _onElementAdded(element, canvasElements) {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentActUUID === acc.act.uuid);
        currentActCanConnector.elements = canvasElements;
        currentActCanConnector.act.addScene(element.uuid);
        this.setState({actCanvasConnectors});
    }

    _onElementClick(element) {
        console.log(`Element click for`, element);
        this.setState({currentSceneUUID: element.uuid});
    }

    _onElementDoubleClick(element) {
        console.log(`Element double click for`, element);
    }

    _onElementContextMenu(element) {
        console.log(`Context menu for`, element);
    }

     _handleSelect(selectedKey) {
        if(selectedKey === 'add-act') {
            const actCanvasConnectors = this.state.actCanvasConnectors;
            const acc = new ActCanvasConnector();
            actCanvasConnectors.push(acc);
            this.setState({actCanvasConnectors});
        } else {
            this.setState({currentActUUID: selectedKey, currentSceneUUID: ''});
        }
    }

    _editorChange(abc) {
        this.forceUpdate();
    }

    _determineEditorToDisplay() {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentActUUID === acc.act.uuid);

        if(currentActCanConnector) {
            if(this.state.currentSceneUUID) {
                const selectedScene = currentActCanConnector.act.scenes.find(scene => {
                    return scene.uuid === this.state.currentSceneUUID
                });
                return (
                    <SceneEditor
                        scene={selectedScene}
                        onSceneChange={this._editorChange}
                    />
                );
            } else {
                return (
                    <ActEditor
                        act={currentActCanConnector.act}
                        onChange={this._editorChange} // TODO change to use onBlur
                    />
                );
            }
        }
        return null;
    }

    /* Util */

    _getActFromState(actUUID) {
        const currentActCanConnector = this.state.actCanvasConnectors
            .find(acc => acc.uuid === actUUID);
        return currentActCanConnector.act;
    }

    render() {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentActUUID === acc.act.uuid);

        return (
            <div>
                <h2>Hello!</h2>
                <Row className="clearfix">
                    <Col sm={1}>
                        <Nav bsStyle="pills" onSelect={this._handleSelect} stacked>
                            {
                                actCanvasConnectors.map((aec, i) => {
                                    return (
                                        <NavItem key={aec.act.uuid} eventKey={aec.act.uuid}>
                                            {aec.act.title}
                                        </NavItem>
                                    );
                                })
                            }
                            <NavItem key="add-act" eventKey="add-act">
                                +
                            </NavItem>
                        </Nav>
                    </Col>
                    {
                        currentActCanConnector ?
                            <Col sm={5}>
                                <Canvas style={{backgroundColor: '#ddd'}}
                                    elements={currentActCanConnector.elements}
                                    onElementAdded={this._onElementAdded}
                                    newElementShape={PredefinedDrawableShape.RectShape}
                                    onElementClick={this._onElementClick}
                                    onElementDoubleClick={this._onElementDoubleClick}
                                    onElementContextMenu={this._onElementContextMenu}
                                />
                            </Col>
                            : null
                    }
                    <Col sm={6}>
                        {this._determineEditorToDisplay()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Modeler;