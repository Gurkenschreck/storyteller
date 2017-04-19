# Architecture

The storyteller should be built using REST-based microservices.

### Frontend

The frontend part of the application is planned to have 2 application pages:
1. The modeler page
2. The listener page
Each page has it's own .html file and .js-bundle. For now, the modeler page has a higher priority.

Both pages depend on an encapsulated module, the react-modeler-canvas. This module is build in
parallel with this application. It is designed to be easily extracted into it's own repository.

For more information about what each part/page does, take a look at [application](application.md).

#### react-modeler-canvas

Will utilize the HTML5 canvas to display the story elementsand and HTML5 websockets to communicate
with the backend.

### The microservices

As already mentioned, the backend part should consist of several microservices.

For now, I can think of these services:

Service | Purpose
--- | ---
Gameservice | Talks with the frontend using websockets.
Persistence service | Stores stories, game elements, help and doc files.
