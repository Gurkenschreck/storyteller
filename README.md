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

...