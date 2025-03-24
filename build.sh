#!/bin/bash

# Fetch updates from remote
git fetch

# Check if there are changes to pull
# if git status -uno | grep -q "Your branch is up to date"; then
#     echo "No changes to pull. Exiting build process."
#     exit 0
# fi

# Pull changes if they exist
git pull


TAG=$(date +%Y.%m.%d.%H.%M)
echo "Building smile_works_app_ui:$TAG"

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Building for macOS"
  docker build -t smile_works_app_ui:"$TAG" .
else
  echo "Building for Linux"
  docker build -t smile_works_app_ui:"$TAG" . --platform linux/amd64
fi

echo "$TAG" > ~/BUILD_UI_TAG