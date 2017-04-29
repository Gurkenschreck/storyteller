import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
import Act from './../domain/Act';

class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';

        const initAct = new Act(
            'First Act',
            'Act description',
        )
        this.state = {
            acts: []
        }

        this._onChange = this._onChange.bind(this);
        this._onElementClick = this._onElementClick.bind(this);
        this._onElementDoubleClick = this._onElementDoubleClick.bind(this);
        this._onElementContextMenu = this._onElementContextMenu.bind(this);
    }

    _onChange(element, all) {
        this.setState({acts: all})
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

    render() {
        return (
            <div>
                <h2>Hello!</h2>
                <Tab.Container id="acts-tabs" defaultActiveKey="I">
                    <Row className="clearfix">
                        <Col sm={2}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="I">
                                    I
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="I">
                                    Somesinck I
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <Canvas style={{backgroundColor: '#ddd'}}
                    elements={this.state.acts}
                    onChange={this._onChange}
                    newElementShape={PredefinedDrawableShape.RectShape}
                    onElementClick={this._onElementClick}
                    onElementDoubleClick={this._onElementDoubleClick}
                    onElementContextMenu={this._onElementContextMenu}
                />
            </div>

        );
    }
}

export default Modeler;