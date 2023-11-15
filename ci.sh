#!/usr/bin/env sh
PROJECT_PATH=$(git rev-parse --show-toplevel)
PROJECT_NAME=$(basename "${PROJECT_PATH}")
BRANCH=$(git branch --show-current)
COMMIT_ID=$(git rev-parse --short HEAD)
MODIFIED_FILES=$(git ls-files -d -m)
COMMIT_TAG=$(git tag --points-at)

buildImage(){
  docker build --network host -f Dockerfile -t "${PROJECT_NAME}:$1" "${PROJECT_PATH}"
}

if [ -n "${MODIFIED_FILES}" ]; then
  echo "You have uncommitted changes"
elif [ "${BRANCH}" != "main" ]; then
  buildImage "${COMMIT_ID}"
elif [ -n "${COMMIT_TAG}" ]; then
  buildImage "${COMMIT_TAG}"
else
  buildImage "latest"
fi
