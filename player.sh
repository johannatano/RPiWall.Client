#!/bin/sh
cd /home/pi/RPiWall.Client/bin
pkill -f TCPSClient3.bin
./TCPSClient3.bin -s "$1"