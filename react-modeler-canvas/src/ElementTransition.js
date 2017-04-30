import uuidV4 from 'uuid/v4';

class ElementTransition {

    uuid = uuidV4();
    transitionSource;
    transitionTarget;

    constructor(transitionSource, transitionTarget) {
        this.transitionSource = transitionSource;
        this.transitionTarget = transitionTarget;
    }

}
export default ElementTransition;