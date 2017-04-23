require('babel-register')({
    only: /react-modeler-canvas/
})

import React from 'react';
import ReactDOM from 'react-dom';

import {Canvas, PredefinedDrawableShape} from 'react-modeler-canvas';

function onElementDoubleClick(element) {
    console.log(element);
}

ReactDOM.render(
    <Canvas style={{backgroundColor: '#ddd'}}
        onElementDoubleClick={onElementDoubleClick}
        newElementShape={PredefinedDrawableShape.RectShape}
    />,
    document.getElementById('modeler_root')
)