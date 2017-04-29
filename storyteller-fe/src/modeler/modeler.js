import React, {Component} from 'react';
import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';





class Modeler extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'Modeler';

        this.state = {
            elements: []
        }

        this._onChange = this._onChange.bind(this);
        this._onElementClick = this._onElementClick.bind(this);
        this._onElementDoubleClick = this._onElementDoubleClick.bind(this);
        this._onElementContextMenu = this._onElementContextMenu.bind(this);
    }

    _onChange(element, all) {
        this.setState({elements: all})
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
                <Canvas style={{backgroundColor: '#ddd'}}
                    elements={this.state.elements}
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