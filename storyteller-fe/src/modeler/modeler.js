import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import Act from './../domain/Act';
import Scene from './../domain/Scene';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';

        const initAct = new Act(
            'First Act',
            'Act description'
        )
        const secondAct = new Act(
            'Secont Act',
            'Act description'
        )
        initAct.on('sceneAdded', this._sceneAdded);
        secondAct.on('sceneAdded', this._sceneAdded);
        const actElementConnector = {};
        actElementConnector[initAct.uuid] ={};
        actElementConnector[initAct.uuid].act = initAct;
        actElementConnector[initAct.uuid].elements = [];
        actElementConnector[secondAct.uuid] = {};
        actElementConnector[secondAct.uuid].act = secondAct;
        actElementConnector[secondAct.uuid].elements = [];
        this.state = {
            currentAct: initAct.uuid,
            actElementConnector
        }

        this._sceneAdded = this._sceneAdded.bind(this);
        this._onElementAdded = this._onElementAdded.bind(this);
        this._onElementClick = this._onElementClick.bind(this);
        this._onElementDoubleClick = this._onElementDoubleClick.bind(this);
        this._onElementContextMenu = this._onElementContextMenu.bind(this);
        this._handleSelect = this._handleSelect.bind(this);
    }

    /* act event handler */

    _sceneAdded(act, addedScene) {
        console.log('scene added', act, addedScene);
    }

    /* react-modeler-canvas callbacks */
    _onElementAdded(element, canvasElements) {

        const actElementConnector = this.state.actElementConnector;
        const curActSceConn = actElementConnector[this.state.currentAct];
        curActSceConn.elements = canvasElements;
        curActSceConn.act.addScene();
        console.log('Added ele to ', curActSceConn, actElementConnector);
        this.setState({actElementConnector});
    }

    _onElementClick(element) {
        console.log(`Element click for`, element);
    }

    _onElementDoubleClick(element) {
        console.log(`Element double click for`, element);
    }

    _onElementContextMenu(element) {
        console.log(`Context menu for`, element);
    }

     _handleSelect(selectedKey) {
       console.log('selected ' + selectedKey);
       this.setState({currentAct: selectedKey});
    }

    render() {
        const aec = this.state.actElementConnector;
        const currentAEC = aec[this.state.currentAct];
        console.log('Rendering ', this.state, currentAEC, aec);
        const actsKeys = Object.keys(aec);
        return (
            <div>
                <h2>Hello!</h2>
                <Row className="clearfix">
                    <Col sm={1}>
                        <Nav bsStyle="pills" onSelect={this._handleSelect} stacked>
                            {
                                actsKeys.map((actKey, i) => {
                                    return (
                                        <NavItem key={aec[actKey].act.title} eventKey={aec[actKey].act.uuid}>
                                            {aec[actKey].act.title}
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Canvas style={{backgroundColor: '#ddd'}}
                            elements={currentAEC.elements}
                            onElementAdded={this._onElementAdded}
                            newElementShape={PredefinedDrawableShape.RectShape}
                            onElementClick={this._onElementClick}
                            onElementDoubleClick={this._onElementDoubleClick}
                            onElementContextMenu={this._onElementContextMenu}
                        />
                    </Col>
                </Row>

            </div>

        );
    }
}

export default Modeler;