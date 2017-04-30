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
        const acts = {};
        acts[initAct.uuid] = initAct;
        acts[secondAct.uuid] = secondAct;
        this.state = {
            currentAct: initAct.uuid,
            acts
        }

        this._onChange = this._onChange.bind(this);
        this._onElementClick = this._onElementClick.bind(this);
        this._onElementDoubleClick = this._onElementDoubleClick.bind(this);
        this._onElementContextMenu = this._onElementContextMenu.bind(this);

        this._handleSelect = this._handleSelect.bind(this);
    }

    /* react-modeler-canvas callbacks */
    _onChange(element, all) {

        // check if element is vorhanden
        const acts = this.state.acts;
        const curAct = acts[this.state.currentAct];
        if(!curAct.scenes.some(scene => scene.uuid === element.uuid)) {
            curAct.addScene();
            this.setState({acts});
        }
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
        const acts = this.state.acts;
        const actsKeys = Object.keys(this.state.acts);
        return (
            <div>
                <h2>Hello!</h2>
                <Row className="clearfix">
                    <Col sm={1}>
                        <Nav bsStyle="pills" onSelect={this._handleSelect} stacked>
                            {
                                actsKeys.map((actKey, i) => {
                                    return (
                                        <NavItem key={acts[actKey].title} eventKey={acts[actKey].uuid}>
                                            {acts[actKey].title}
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Canvas style={{backgroundColor: '#ddd'}}
                            onChange={this._onChange}
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