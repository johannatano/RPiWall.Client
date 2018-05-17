#!/bin/sh


#echo "hemligt!" | su pi -c "/home/pi/Nelly.com.90s-Party/app.sh &" << EOF

#whoami
#echo "hemligt!" | su - pi << EOF
#whoami

#sleep 20

#cd /home/pi/Nelly.com.90s-Party

#whoami
#echo "hemligt!" | su - pi << EOF
#whoami


cd /home/pi/RPiWall.Client
sh update_source.sh

cd /home/pi/RPiWall.Client/node

#whoami
#whoami
#echo "hemligt!" | su - pi << EOF
#whoami

/home/pi/n/bin/node forever.js

#sleep 20

#cd /home/pi/Nelly.com.90s-Party
#sh update_source.sh

#cd /home/pi/Nelly.com.90s-Party/server
#node app.js
