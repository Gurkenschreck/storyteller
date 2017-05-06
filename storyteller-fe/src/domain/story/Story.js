import uuidV4 from 'uuid/v4';
import clonedeep from 'lodash.clonedeep';
import {EventEmitter} from 'events';
import Act from './Act';

class Story extends EventEmitter {

    uuid = uuidV4();
    _acts;
    _title;
    _description;

    get acts() {
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

    getCurrentSelectedAct() {
        return this.acts.find(act => act.selected);
    }

    getCurrentSelectedScene() {
        const curSelAct = this.getCurrentSelectedAct();
        console.log('Get current selected act', curSelAct);
        return curSelAct ? curSelAct.scenes.find(scene => scene.selected) : null;
    }

    createAct(title, description) {
        const newAct = new Act(title, description);
        this._acts.push(newAct);
        this.emit('actCreated', newAct, this._acts);
    }

    findAct(uuid) {
        return this._acts.find(act => act.uuid === uuid);
    }

    selectAct(actUUID) {
        // should be done in story
        const actWithUUID = this.findAct(actUUID);
        if(actWithUUID) {
            const curSelectedAct = this.getCurrentSelectedAct();
            const oldAct = clonedeep(curSelectedAct);
            if(curSelectedAct) {
                curSelectedAct.selected = false;
            }
            actWithUUID.selected = true;
            this.emit('onSelectedActChanged', oldAct, actWithUUID);
        }
    }

    clearSceneSelection() {
        this._acts.forEach(act => act.removeSceneSelection());
        this.emit('onSelectedSceneChanged');
    }
}

export default Story;