#!/bin/bash

sudo npm start &

mjpg_streamer -o "output_http.so -p 9000" -i "input_uvc.so -r 640x480 -n -y"