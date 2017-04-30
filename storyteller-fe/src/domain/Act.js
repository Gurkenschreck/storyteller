import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import Scene from './Scene';
import {autobind_functions} from './../utils/autobind_functions';

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
        this.scenes.push(newScene);
        this.emit('sceneAdded', this, newScene);
    }

    removeScene(uuid) {
        this.scenes = this.scenes.filter(scene => {
            return scene.uuid !== uuid;
        });
        this.emit('sceneRemoved', this, this.scenes);
    }

}

export default Act;