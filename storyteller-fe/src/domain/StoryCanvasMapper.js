import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import {autobind_functions} from './../utils/autobind_functions';
import Story from './Story';
import Act from './Act';
import Scene from './Scene';

class StoryCanvasMapper extends EventEmitter {

    _story;
    _elements;

    get story() {
        return this._story;
    }

    set story(story) {
        this._story = story;
        this.emit('storyChanged', this, story);
    }

    get elements() {
        return this._elements;
    }

    set elements(elements) {
        this._elements = elements;
        this.emit('elementsChanged', this, elements);
    }

    constructor() {
        super();
        autobind_functions(this);
        this._story = new Story('New Story', 'Once upon a time...');
        this._story.on('actAdded', this.onActAdded);
        
        this._elements = [];
    }

    createAct(title, description) {
        this._story.createNewAct(title, description);
    }

    getCurrentSelectedAct() {
        return this._story.acts.find(act => act.selected);
    }

    getCurrentSelectedScene() {
        const curSelAct = this.getCurrentSelectedAct();
        return curSelAct ? curSelAct.scenes.find(scene => scene.selected) : null;
    }

    onActAdded(newAct, acts) {
        // TODO bind act handler ?
        const curSelectedAct = this.getCurrentSelectedAct();
        if(curSelectedAct) {
            curSelectedAct.selected = false;
        }
        newAct.selected = true;
        this.emit('onSelectedActChange', curSelectedAct, newAct);
    }

}

export default StoryCanvasMapper;