import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import clonedeep from 'lodash.clonedeep';
import {autobind_functions} from './../utils/autobind_functions';
import Story from './story/Story';

/**
 * The StoryCanvasMapper brings the canvas elements
 * and the story together. 
 */
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

    constructor(story) {
        super();
        autobind_functions(this);
        this._story = story;
        this._story.on('actCreated', this.onActCreated);
        
        this._elements = [];
    }

    onActCreated(newAct, acts) {
        // TODO bind act handler ?
        const curSelectedAct = this.story.getCurrentSelectedAct();
        if(curSelectedAct) {
            curSelectedAct.selected = false;
        }
        newAct.selected = true;
        this.emit('onSelectedActChange', curSelectedAct, newAct);
    }

    mapCanvasElements(canvasElements) {
        // merge incoming canvasElements with existing
        const concatted = this.elements.concat(canvasElements);

        const filteredForDuplicated = concatted.map(ele => {
            const filtered = concatted.filter(conEle => conEle.uuid === ele.uuid);
            if(filtered.length === 1) {
                // found self
                return ele;
            } else {
                // take most recent element
                return filtered[filtered.length - 1]
            }
        })
        this._elements = filteredForDuplicated;
    }    

    getScenesToRender() {
        // get current act scene uuids and return canvas elements with uuid
        const sceneUUIDs = this.story.getCurrentSelectedAct().scenes.map(scene => {
            return scene.uuid;
        });

        const canvasElements = this._elements.filter(ele => {
            return sceneUUIDs.includes(ele.uuid);
        })

        return canvasElements;
    }

}

export default StoryCanvasMapper;