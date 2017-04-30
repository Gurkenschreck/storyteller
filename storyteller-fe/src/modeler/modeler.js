import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import Act from './../domain/Act';
import Scene from './../domain/Scene';
import ActCanvasConnector from './../domain/ActCanvasConnector';
import {autobind_functions} from './../utils/autobind_functions';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';

        this.state = {
            currentAct: '',
            actCanvasConnectors: []
        }

        autobind_functions(this);
    }

    /* act event handler */
    _sceneAdded(act, addedScene) {
    }

    /* react-modeler-canvas callbacks */
    _onElementAdded(element, canvasElements) {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentAct === acc.act.uuid);
        currentActCanConnector.elements = canvasElements;
        currentActCanConnector.act.addScene(element.uuid);
        this.setState({actCanvasConnectors});
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
        if(selectedKey === 'add-act') {
            const actElementConnectors = this.state.actCanvasConnectors;
            const acc = new ActCanvasConnector();
            actElementConnectors.push(acc);
            this.setState({actElementConnectors});
        } else {
            this.setState({currentAct: selectedKey});
        }
    }

    render() {
        const actCanvasConnectors = this.state.actCanvasConnectors;
        const currentActCanConnector = actCanvasConnectors.find(acc => this.state.currentAct === acc.act.uuid);
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
                    <Col sm={11}>
                        {
                            currentActCanConnector ?
                                <Canvas style={{backgroundColor: '#ddd'}}
                                    elements={currentActCanConnector.elements}
                                    onElementAdded={this._onElementAdded}
                                    newElementShape={PredefinedDrawableShape.RectShape}
                                    onElementClick={this._onElementClick}
                                    onElementDoubleClick={this._onElementDoubleClick}
                                    onElementContextMenu={this._onElementContextMenu}
                                />
                                : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Modeler;