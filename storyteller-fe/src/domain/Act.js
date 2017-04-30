import uuidV4 from 'uuid/v4';
import {EventEmitter} from 'events';
import Scene from './Scene';

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

        this.addScene = this.addScene.bind(this);
        this.removeScene = this.removeScene.bind(this);
    }

    addScene() {
        const newScene = new Scene(this);
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