import uuidV4 from 'uuid/v4';
import clonedeep from 'lodash.clonedeep';
import {EventEmitter} from 'events';
import Scene from './Scene';
import {autobind_functions} from './../../utils/autobind_functions';

/**
 * An act is a definite section of a story. One story
 * can have several acts, and one act is made up of
 * several scenes.
 * 
 * Class-Events:
 * titleChanged(act, oldTitle, newTitle)
 * descriptionChanged(act, oldDescription, newDescription)
 * scenesChanged(act, oldScenes, newScenes)
 * sceneActChanged(act, scene, oldact (this), newAct)
 * sceneTitleChanged(act, scene, oldTitle, newTitle)
 * sceneDescriptionChanged(act, scene, oldDescription, newDescription)
 */
class Act extends EventEmitter {

    uuid = uuidV4();
    _title;
    _description;
    _scenes;
    _selected;
    _active;

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

    get scenes() {
        return this._scenes;
    }

    set scenes(scenes) {
        const oldScenes = this._scenes;
        this._scenes = scenes;
        this.emit('scenesChanged', this, oldScenes, scenes);
    }

    get selected() {
        return this._selected;
    }

    set selected(selected) {
        this._selected = selected;
        console.log('set selected', this.uuid, selected, this._selected);
        this.emit('selectedChanged', this, selected);
    }

    get active() {
        return this._active;
    }

    set active(active) {
        this._active = active;
        this.emit('activeChanged', this, active);
    }

    constructor(title, description, scenes = []) {
        super();
        this._title = title;
        this._description = description;
        this._scenes = scenes;
        this._selected = false;
        this._active = false;

        autobind_functions(this);
    }

    addScene(uuid) {
        const newScene = new Scene(this);
        newScene.uuid = uuid || newScene.uuid;
        newScene.on('actChanged', this.onSceneActChanged);
        newScene.on('titleChanged', this.onSceneTitleChanged);
        newScene.on('descriptionChanged', this.onSceneDescriptionChanged);
        this._scenes.push(newScene);
        this.emit('sceneAdded', this, newScene);
    }

    removeScene(uuid) {
        this.scenes = this._scenes.filter(scene => scene.uuid !== uuid);
        this.emit('sceneRemoved', this, this._scenes);
    }

    selectScene(sceneUUID) {
        // should be done in act
        const curSelected = this._scenes.find(scene => scene.selected);
        const oldSelectedScene = clonedeep(curSelected);
        const newSelected = this._scenes.find(scene => scene.uuid === sceneUUID);
        if(curSelected) {
            curSelected.selected = false;
        }
        console.log('#', curSelected, newSelected, this._scenes);
        newSelected.selected = true;
        this.emit('onSelectedSceneChanged', oldSelectedScene, newSelected);
    }

    removeSceneSelection() {
        this._scenes.forEach(scene => scene.selected = false);
        this.emit('onSelectedSceneChanged');
    }

    onSceneActChanged(scene, oldAct, newAct) {
        // TODO unsubscribe this scene
        this.emit('sceneActChanged', this, scene, oldAct, newAct);
    }

    onSceneTitleChanged(scene, oldTitle, newTitle) {
        this.emit('sceneTitleChanged', this, scene, oldTitle, newTitle);
    }

    onSceneDescriptionChanged(scene, oldDesc, newDesc) {
        this.emit('sceneDescriptionChanged', this, scene, oldDesc, newDesc);
    }

}

export default Act;