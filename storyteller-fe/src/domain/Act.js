import uuidV4 from 'uuid/v4';
import Scene from './Scene';

class Act {

    uuid = uuidV4();
    title;
    description;
    scenes;

    constructor(title, description, scenes = []) {
        this.title = title;
        this.description = description;
        this.scenes = scenes;

        this.addScene = this.addScene.bind(this);
        this.removeScene = this.removeScene.bind(this);
    }

    addScene() {
        const newScene = new Scene(this);
        this.scenes.push(newScene);
    }

    removeScene(uuid) {
        this.scenes = this.scenes.filter(scene => {
            return scene.uuid !== uuid;
        });
    }

}

export default Act;