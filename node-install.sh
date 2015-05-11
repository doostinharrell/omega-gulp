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

npm install gulp gulp-load-plugins gulp-uglify gulp-css-globbing node-sass gulp-sass gulp-autoprefixer gulp-minify-css gulp-sourcemaps browser-sync

echo "Node modules installed"


# Build file structure

echo "Building file structure"

#mkdir dev 
mkdir build
mkdir build/js
mkdir build/maps
mv js/ dev/
mv sass/ dev/
mv css build/

echo "File structure built"


# Updating Theme Files

echo "Updating theme files"

PWD=$(pwd)
DIR=$(basename $(pwd))

#find $PWD -name "$DIR.info" -type f -exec sed -i 's/ css\// build\/css\//g; s/ js\// build\/js\//g' {} ";"
find $PWD -name "$DIR.info" -type f -exec sed -i "s/ EXAMPLE/ $DIR/g" {} ";"
find $PWD -name "gulpfile.js" -type f -exec sed -i "s/ EXAMPLE/ $DIR/g" {} ";"

echo "Theme files updated"


# Resolving issues with Drupal looking at node_module info files

echo "Resolving issues with Drupal looking at node_module info files"

find -L ./node_modules -type f -name "*.info" -print0 | while IFS= read -r -d '' FNAME; do
    mv -- "$FNAME" "${FNAME%.info}.inf0"
done

echo "Issues resolved. Please clear your drupal caches ie: drush cc all"
echo "Run the command 'gulp' within this directory to run gulp tasks"