#!/bin/bash
set -e  # Stop on error

cd /var/www/area-dev

echo "🛑 Stopping old containers..."
docker-compose down -v

SERVICE_FILE=/etc/systemd/system/area-dev.service

if [ ! -f "$SERVICE_FILE" ]; then
  echo "⚙️ Creating systemd service for auto-start on reboot..."
  sudo tee $SERVICE_FILE > /dev/null <<EOL
[Unit]
Description=AREA Dev Docker Compose Service
After=network.target docker.service
Requires=docker.service

[Service]
Type=oneshot
WorkingDirectory=/var/www/area-dev
ExecStart=/usr/local/bin/docker-compose up -d --build db server
ExecStop=/usr/local/bin/docker-compose down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOL

   echo "bbb"
  sudo systemctl daemon-reload
  echo "ccc"
  sudo systemctl enable area-dev.service
  echo "✅ Systemd service created."
fi
