#!/bin/bash
#
# Run this shell script to install all node modules for the project
#
# Author: Dustin Harrell - https://github.com/doostinharrell/
# Version: 1.0
#
# Notes:
#
# If your shell script throws errors regarding line endings when running
#
# Then run the following command:
# dos2unix node-install.sh


# Install Node Modules

echo "Installing Node modules"

npm install gulp gulp-load-plugins gulp-uglify gulp-css-globbing node-sass gulp-sass gulp-autoprefixer gulp-minify-css gulp-sourcemaps browser-sync gulp-concat

echo "Node modules installed"


# Build file structure

echo "Building file structure"

PWD=$(pwd)
DIR=$(basename $(pwd))

sudo echo $DIR

mkdir build
mkdir build/js
mkdir build/maps
mv css build/
mv js dev/js
rm -Rf sass
rm -f $DIR.info

echo "File structure built"


# Updating Theme Files

echo "Updating theme files"

find $PWD -name "EXAMPLE.info" -type f -exec sed -i "s/EXAMPLE/$DIR/g" {} ";"
find $PWD -name "gulpfile.js" -type f -exec sed -i "s/EXAMPLE/$DIR/g" {} ";"
mv dev/sass/EXAMPLE.hacks.scss dev/sass/$DIR.hacks.scss
mv dev/sass/EXAMPLE.normalize.scss dev/sass/$DIR.normalize.scss
mv dev/sass/EXAMPLE.styles.scss dev/sass/$DIR.styles.scss
mv EXAMPLE.info $DIR.info

echo "Theme files updated"


# Resolving issues with Drupal looking at node_module info files

echo "Resolving issues with Drupal looking at node_module info files"

find -L ./node_modules -type f -name "*.info" -print0 | while IFS= read -r -d '' FNAME; do
    mv -- "$FNAME" "${FNAME%.info}.inf0"
done

echo "Issues resolved"

# Clear Drupal Cache

echo "Clearing Drupal cache"

drush cc all

echo "Drupal cached cleared"

echo "Run the command 'gulp' within this directory to run gulp tasks"