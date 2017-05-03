import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';

import Act from './Act';

class Story extends EventEmitter {

    uuid = uuidV4();
    _acts;
    _title;
    _description;

    get acts() {
        console.log('get acts', this._acts);
        return this._acts;
    }

    set acts(acts) {
        const oldActs = this._acts;
        this._acts = acts;
        this.emit('actsChanged', this, oldActs, acts);
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

    constructor(title = '', desciption = '', acts = []) {
        super();
        this._title = title;
        this._description = desciption;
        this._acts = acts;
    }

    createNewAct(title, description) {
        const newAct = new Act(title, description);
        this._acts.push(newAct);
        this.emit('actAdded', newAct, this._acts);
    }
}

export default Story;