require('babel-register')({
    only: /react-modeler-canvas/
})

import React from 'react';
import ReactDOM from 'react-dom';

import Modeler from './modeler/modeler';

ReactDOM.render(
    <Modeler />,
    document.getElementById('modeler_root')
)