#!/bin/bash

TAG=$(date +%Y.%m.%d.%H.%M)
echo "Building smile_works_app_ui:$TAG"

docker build -t smile_works_app_ui:"$TAG" .

