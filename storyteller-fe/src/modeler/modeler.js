import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import ActEditor from './../components/ActEditor';
import SceneEditor from './../components/SceneEditor';
import Story from './../domain/story/Story';
import StoryCanvasMapper from './../domain/StoryCanvasMapper';
import {autobind_functions} from './../utils/autobind_functions';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';
        autobind_functions(this);

        this.state = {        }

        const initStory = new Story('New Story', 'Once upon a time...');
        initStory.on('actCreated', this._onActCreated);
        this.storyCanvasMapper = new StoryCanvasMapper(initStory);
        this.storyCanvasMapper.on('onSelectedActChanged', this._onSelectedActChanged);
    }

    componentWillMount() {
        this.storyCanvasMapper.story.createAct('Initial Act Title', 'Initial Act Description');        
    }

    /* event handlers of storycanvasmapper and co. */
    /* Story */
    _onActCreated(newAct) {
        newAct.on('onSelectedSceneChanged', this._onSelectedSceneChanged);
    }

    _onSelectedActChanged(oldAct, newAct) {
        this.forceUpdate();
    }

    _onSelectedSceneChanged(oldAct, newAct) {
        this.forceUpdate();
    }

    /* react-modeler-canvas callbacks */
    _onElementAdded(element, canvasElements) {
        const curAct = this.storyCanvasMapper.story.getCurrentSelectedAct();
        this.storyCanvasMapper.mapCanvasElements(canvasElements);
        curAct.addScene(element.uuid);
        this.forceUpdate();
    }

    _onElementClick(element) {
        console.log(`Element click for`, element);
        this.storyCanvasMapper.story.getCurrentSelectedAct().selectScene(element.uuid);
    }

    _onElementDoubleClick(element) {
        console.log(`Element double click for`, element);
    }

    _onElementContextMenu(element) {
        console.log(`Context menu for`, element);
    }

     _handleSelect(selectedKey) {
        if(selectedKey === 'add-act') {
            this.storyCanvasMapper.story.createAct('New Act', '...');
            this.forceUpdate();
        } else {
            this.storyCanvasMapper.story.clearSceneSelection();
            this.storyCanvasMapper.story.selectAct(selectedKey);
            this.forceUpdate();            
        }
    }

    _handleSceneEditorBlur(scene) {
        this.forceUpdate();
    }

    _handleActEditorBlur(act) {
        this.forceUpdate();
    }

    _getDisplayedEditor() {
        const curSelectedScene = this.storyCanvasMapper.story.getCurrentSelectedScene();
        if(curSelectedScene) {
            return (
                <SceneEditor
                    scene={curSelectedScene}
                    onChange={this._handleSceneEditorBlur}
                />
            );
        }
        const curSelectedAct = this.storyCanvasMapper.story.getCurrentSelectedAct();
        if(curSelectedAct) {
            return (
                <ActEditor
                    act={curSelectedAct}
                    onChange={this._handleActEditorBlur} // TODO change to use onBlur
                />
            );
        }
        return null;
    }

    render() {
        const curActiveAct = this.storyCanvasMapper.story.getCurrentSelectedAct();
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
                                elements={this.storyCanvasMapper.getScenesToRender()}
                                onElementAdded={this._onElementAdded}
                                newElementShape={PredefinedDrawableShape.RectShape}
                                onElementClick={this._onElementClick}
                                onElementDoubleClick={this._onElementDoubleClick}
                                onElementContextMenu={this._onElementContextMenu}
                            />
                        </Col>
                    <Col sm={6}>
                        {this._getDisplayedEditor()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Modeler;