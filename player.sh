#!/bin/sh
cd /home/pi/Nelly.com.90s-Party
pkill -f TCPSClient3.bin
./TCPSClient3.bin -s "$1"