import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import ActEditor from './../components/ActEditor';
import SceneEditor from './../components/SceneEditor';
import Act from './../domain/Act';
import Scene from './../domain/Scene';
import StoryCanvasMapper from './../domain/StoryCanvasMapper';
import ActCanvasConnector from './../domain/ActCanvasConnector';
import {autobind_functions} from './../utils/autobind_functions';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';
        autobind_functions(this);

        this.state = {
            currentActUUID: '',
            currentSceneUUID: '',
            actCanvasConnectors: []
        }

        this.storyCanvasMapper = new StoryCanvasMapper();
        this.storyCanvasMapper.on('onSelectedActChange', this._onSelectedActChange);
    }

    componentWillMount() {
        this.storyCanvasMapper.createAct('Initial Act Title', 'Initial Act Description');        
    }

    _onSelectedActChange(oldAct, newAct) {
        console.log(oldAct, newAct);
    }

    /* react-modeler-canvas callbacks */
    _onElementAdded(element, canvasElements) {
        console.log('added', element, canvasElements);



        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentActUUID === acc.act.uuid);
        currentActCanConnector.elements = canvasElements;
        currentActCanConnector.act.addScene(element.uuid);
        this.setState({actCanvasConnectors, currentSceneUUID: element.uuid});
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

    _handleSceneEditorBlur(scene) {
        // TODO refactor
        const actCanvasConnector = this._getActCanvasConnectorFromState(scene.act.uuid);
        const sce = actCanvasConnector.act.scenes.find(sc => sc.uuid === scene.uuid);
        actCanvasConnector.act.scenes[actCanvasConnector.act.scenes.indexOf(sce)] = scene;
        this.forceUpdate();
    }

    _handleActEditorBlur(act) {
        const actCanvasConnector = this._getActCanvasConnectorFromState(act.uuid);
        actCanvasConnector.act = act;
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
                console.log('#', selectedScene, this.state.currentSceneUUID);
                if(selectedScene) {
                    return (
                        <SceneEditor
                            scene={selectedScene}
                            onChange={this._handleSceneEditorBlur}
                        />
                    );
                }
            }

            return (
                <ActEditor
                    act={currentActCanConnector.act}
                    onChange={this._handleActEditorBlur} // TODO change to use onBlur
                />
            );
        }
        return null;
    }

    _newDetermineEditorToDisplay() {
        console.log('new');
        const curSelectedScene = this.storyCanvasMapper.getCurrentSelectedScene();
        if(curSelectedScene) {
            return (
                <SceneEditor
                    scene={curSelectedScene}
                    onChange={this._handleSceneEditorBlur}
                />
            );
        }

        console.log('no sel scene ');
        const curSelectedAct = this.storyCanvasMapper.getCurrentSelectedAct();
        if(curSelectedAct) {
            return (
                <ActEditor
                    act={curSelectedAct}
                    onChange={this._handleActEditorBlur} // TODO change to use onBlur
                />
            );
        }
        console.log('nothing selected', this.storyCanvasMapper);

        return null;
    }

    /* Util */

    _getActCanvasConnectorFromState(actUUID) {
        const currentActCanConnector = this.state.actCanvasConnectors
            .find(acc => acc.act.uuid === actUUID);
        return currentActCanConnector;
    }

    render() {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentActUUID === acc.act.uuid);

        const curActiveAct = this.storyCanvasMapper.getCurrentSelectedAct();
        return (
            <div>
                <h2>Hello!</h2>
                <Row className="clearfix">
                    <Col sm={1}>
                        <Nav bsStyle="pills" onSelect={this._handleSelect} stacked>
                            {
                                this.storyCanvasMapper.story.acts.map((act, i) => {
                                    return (
                                        <NavItem key={act.uuid} eventKey={act.uuid}>
                                            {act.title}
                                        </NavItem>
                                    );
                                })
                            }
                            <NavItem key="add-act" eventKey="add-act">
                                +
                            </NavItem>
                        </Nav>
                    </Col>
                        <Col sm={5}>
                            <Canvas style={{backgroundColor: '#ddd'}}
                                elements={this.storyCanvasMapper.elements}
                                onElementAdded={this._onElementAdded}
                                newElementShape={PredefinedDrawableShape.RectShape}
                                onElementClick={this._onElementClick}
                                onElementDoubleClick={this._onElementDoubleClick}
                                onElementContextMenu={this._onElementContextMenu}
                            />
                        </Col>
                    <Col sm={6}>
                        {this._newDetermineEditorToDisplay()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Modeler;