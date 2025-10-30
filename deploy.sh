#!/bin/bash
set -e  # Stop on error

cd /var/www/area-dev

echo "🛑 Restarting Systemd service..."
sudo systemctl restart area-dev.service
echo "✅ Systemd service created."
