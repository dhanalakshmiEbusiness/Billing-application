#!/usr/bin/env bash

PROJECT=pulse-control-panel
SOURCE_DIR=$PWD
PLATFORM=$(uname)


gitRevision() {
    GIT_REPOSITORY=$1
    cd $GIT_REPOSITORY
    REVISION=$(git rev-list --count HEAD)
    git diff --exit-code >/dev/null 2>&1
    LOCAL_CHANGES1=$?
    git diff --cached --exit-code >/dev/null 2>&1
    LOCAL_CHANGES2=$?
    LOCAL_CHANGES=$((LOCAL_CHANGES1 + LOCAL_CHANGES2))
    if [ "$LOCAL_CHANGES" == "0" ]; then
        LOCAL_CHANGES=""
    else
        LOCAL_CHANGES="+"
    fi
    echo ${REVISION}${LOCAL_CHANGES}
}

V1=$(gitRevision $SOURCE_DIR)

VERSION="git${V1}"
BUNDLE="${PROJECT}-${VERSION}-${PLATFORM}.zip"

echo "Building bundle ${BUNDLE}"

rm -rf bundle
mkdir bundle

if [ "$PLATFORM" == "Linux" ]; then
  wget -c https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-x64.tar.xz
  tar xvf node-v4.4.7-linux-x64.tar.xz -C bundle
  mv bundle/node-v4.4.7-linux-x64 bundle/nodejs
elif [ "$PLATFORM" == "Darwin" ]; then
  wget -c https://nodejs.org/dist/v4.4.7/node-v4.4.7-darwin-x64.tar.gz
  tar xvf node-v4.4.7-darwin-x64.tar.gz -C bundle
  mv bundle/node-v4.4.7-darwin-x64 bundle/nodejs
fi

cp -r app bundle
cp -r config bundle
cp -r Public bundle
cp -r lib bundle
cp -r scriptseeder bundle
rm -rf bundle/Public/Graphics
cp app.js package.json pulse-smrt-woodlands-dashboard.js bundle
for i in description.json README.md configuration.sample.json launcher check-requirements; do
    sed "s|@GIT_REVISION@|${VERSION}|" ${SOURCE_DIR}/$i > bundle/$i || exit -1
done

cd bundle
chmod +x nodejs/bin/node
export PATH=$PWD/nodejs/bin:$PATH
npm install

zip ../${BUNDLE} -r *
