#!/bin/sh
cd /home/pi/RPiWall.Client
pkill -f TCPSClient3.bin
./TCPSClient3.bin -s "$1"