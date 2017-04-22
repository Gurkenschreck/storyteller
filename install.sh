#!/bin/sh

printf "Setting things up for you...\n"

printf "Installing storyteller-fe modules\n"
cd storyteller-fe
npm install
cd ..

printf "Installing react-modeler-canvas modules\n"
cd react-modeler-canvas
npm install

printf "Linking react module for react-modeler-canvas to storyteller-fe react module\n"
cd node_modules/
printf "Removing existing react\n"
rm -rf react/
printf "Creating softlink\n"
ln -s ../../storyteller-fe/node_modules/react/ react

printf "Finished.\n"
