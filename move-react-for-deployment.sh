#!/bin/bash
npm run build
cd server
rm -rf build
cd ..
cp -rf build/ server/