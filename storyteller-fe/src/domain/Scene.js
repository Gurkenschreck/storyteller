import uuidV4 from 'uuid/v4';

class Scene {

    uuid = uuidV4();
    act;
    title = '';
    description = '';

    constructor(act) {
        this.act = act;
    }

}

export default Scene;