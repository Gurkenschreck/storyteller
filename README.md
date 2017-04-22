# Storyteller

A small project to test out the capacities of HTML5 canvas, websockets and microservices.

The storyteller is planned to be a tool for creating interactive story lines / preparing
adventures for games like pen and paper. It is a ruleset agnostic application which focuses
on story creation.

## Purpose

Creating a story is an interesting activity, but a kind of difficult one. Storyteller should
support the author of an adventure by providing an interface to structure the story elements,
creating scenes, plan epic storylines, battles and loot.

Therefore the author can focus on the important part: the story.

### The plan

The first goal is to provide the modeler interface. The author can create basic adventures.

## Tech

The frontend will be built using ReactJS, Redux, webpack and babel. The backend will consist of
microservices, which have yet to be specified.

### Folders / Project Structure

This project consists of the following folders:

Folder | Purpose
--- | ---
react-modeler-canvas | canvas functionality excluded from the main frontend.
storyteller-fe | a frontend implementation of the storyteller app.

### Build

react-modeler-canvas is a standalone module which is just located inside this repository.  
storyteller-fe has a softlink (through *npm link ../react-modeler-canvas*) to this package. It compiles this package on the fly using babel-register. This allows the simultaneous development of the could-be-standalone package react-modeler-canvas. react-modeler-canvas can later be extracted.

To start the application, run the following commands:
```bash
git clone https://github.com/Gurkenschreck/storyteller.git
cd storyteller
./install.sh
cd storyteller-fe
npm start
```
For development, the install.sh script will set up some things. storyteller-fe and react-modeler-canvas depend on react. storyteeller-fe links to react-modeler-canvas and includes it. With this setup, there are 2 react packages being exposed. Because of this, a link is created from react-modeler-canvas/node_modules/react to the react package in storyteller-fe. The install.sh script does this for you, until I spend some time looking for a better solution.

The application will be hosted at [http://localhost:4711](http://localhost:4711).