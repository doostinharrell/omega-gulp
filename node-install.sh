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

npm install gulp gulp-load-plugins gulp-uglify gulp-css-globbing node-sass gulp-sass gulp-minify-css gulp-sourcemaps browser-sync

echo "Node modules installed"


# Resolving issues with Drupal looking at node_module info files

echo "Resolving issues with Drupal looking at node_module info files"

find -L ./node_modules -type f -name "*.info" -print0 | while IFS= read -r -d '' FNAME; do
    mv -- "$FNAME" "${FNAME%.info}.inf0"
done

echo "Issues resolved."


# Build file structure

echo "Building file structure"

rm -Rf css
rm -Rf js
rm -Rf sass

echo "File structure built"


# Updating Theme Files

echo "Updating theme files"

DIR=$(basename $(pwd))

mv EXAMPLE.info $DIR.info
find $PWD -name "$DIR.info" -type f -exec sed -i "s/EXAMPLE/$DIR/g" {} ";"

mv dev/js/EXAMPLE.behaviors.js dev/js/$DIR.behaviors.js
find $PWD/dev/js -name "$DIR.behaviors.js" -type f -exec sed -i "s/EXAMPLE/$DIR/g" {} ";"

find $PWD -name "gulpfile.js" -type f -exec sed -i "s/EXAMPLE/$DIR/g" {} ";"

mv dev/sass/EXAMPLE.hacks.scss dev/sass/$DIR.hacks.scss
mv dev/sass/EXAMPLE.normalize.scss dev/sass/$DIR.normalize.scss
mv dev/sass/EXAMPLE.styles.scss dev/sass/$DIR.styles.scss

echo "Theme files updated. Please clear your drupal caches ie: drush cc all"