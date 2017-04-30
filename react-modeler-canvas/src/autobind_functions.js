export const autobind_functions = (entity) => {
    Object.getOwnPropertyNames(
        Object.getPrototypeOf(entity)
    ).forEach(prop => {
        if(typeof entity[prop] === 'function') {
            entity[prop] = entity[prop].bind(entity);
        }
    }); 
}