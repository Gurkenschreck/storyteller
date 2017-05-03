import Act from './Act';


/**
 * Der act-canvas-element-abbilder bildet die Inhalte
 * eines Akts (u.a. die Szenen) auf canvas-modellier-elemente
 * ab.
 * Der Abbilder kümmert sich um die Synchronisation der
 * einzelnen Storyelemente.
 * Dazu sollte er den wichtigsten Dingen, die er abbilden soll
 * subscriben und auf deren Events reagieren.
 *
 * Die Abbildung geschieht hauptsächlich von
 * SCENE > ACT > (CANVAS) > ELEMENT
 * kann aber auch von
 * ELEMENT > (CANVAS) > ACT > ELEMENT
 * gescheen.
 */

class ActCanvasConnector { // Act Canvas Elemnt abbilder

    act;
    elements;

    constructor(act, elements = []) {
        this.act = act;
        this.elements = elements;
    }

}

export default ActCanvasConnector;