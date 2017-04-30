import Act from './Act';

class ActCanvasConnector {

    act;
    elements;

    constructor(act = new Act(
        'New Act',
        'Act description'
    ), elements = []) {
        this.act = act;
        this.elements = elements;
    }

}

export default ActCanvasConnector;