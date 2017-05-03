import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';

/**
 * A scene gives the characters a concrete context.
 * Fachlich, characters move and handeln in a given
 * context.
 *
 * Class-Events:
 * actChanged(scene, oldAct, newAct)
 * titleChanged(scene, oldTitle, newTitle)
 * descriptionChanged(scene, oldDescription, newDescription)
 */
class Scene extends EventEmitter {


    uuid = uuidV4();
    _act;
    _title = '';
    _description = '';

    get act() {
        return this._act;
    }

    set act(act) {
        const oldAct = this._act;
        this._act = act;
        this.emit('actChanged', this, oldAct, act);
    }

    get title() {
        return this._title;
    }

    set title(title) {
        const oldTitle = this._title;
        this._title = title;
        this.emit('titleChanged', this, oldTitle, title);
    }

    get description() {
        return this._description;
    }

    set description(description) {
        const oldDescription = this._description;
        this._description = description;
        this.emit('descriptionChanged', this, oldDescription, description);
    }

    constructor(act, title = '', desciption = '') {
        this._act = act;
        this._title = title;
        this._description = desciption;
    }

}

export default Scene;