import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import Scene from './Scene';
import {autobind_functions} from './../utils/autobind_functions';


/**
 * An act is a definite section of a story. One story
 * can have several acts, and one act is made up of
 * several scenes
 * .
 * Class-Events:
 * sceneActChanged(act, scene, oldact (this), newAct)
 * sceneTitleChanged(act, scene, oldTitle, newTitle)
 * sceneDescriptionChanged(act, scene, oldDescription, newDescription)
 */
class Act extends EventEmitter {

    uuid = uuidV4();
    title;
    description;
    scenes;

    constructor(title, description, scenes = []) {
        super();
        this.title = title;
        this.description = description;
        this.scenes = scenes;

        autobind_functions(this);
    }

    addScene(uuid) {
        const newScene = new Scene(this);
        newScene.uuid = uuid || newScene.uuid;
        newScene.on('actChanged', this.onSceneActChanged);
        newScene.on('titleChanged', this.onSceneTitleChanged);
        newScene.on('descriptionChanged', this.onSceneDescriptionChanged);
        this.scenes.push(newScene);
        this.emit('sceneAdded', this, newScene);
    }

    removeScene(uuid) {
        this.scenes = this.scenes.filter(scene => {
            return scene.uuid !== uuid;
        });
        this.emit('sceneRemoved', this, this.scenes);
    }

    onSceneActChanged(scene, oldAct, newAct) {
        // TODO unsubscribe this scene
        this.emit('sceneActChanged', this, scene, oldAct, newAct);
    }

    onSceneTitleChanged(oldTitle, newTitle) {
        this.emit('sceneTitleChanged', this, scene, oldTitle, newTitle);
    }

    onSceneDescriptionChanged(oldDesc, newDesc) {
        this.emit('sceneDescriptionChanged', this, scene, oldDesc, newDesc);
    }

}

export default Act;