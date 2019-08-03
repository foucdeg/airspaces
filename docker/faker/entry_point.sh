
while true;
do
TARGET_IP=$(netstat -nr | grep '^0\.0\.0\.0' | awk '{print $2}') node replay-faker.js
echo "Rewinding..."
sleep 45
done
