#!/bin/sh
set -e

echo "==> Starting Donet Laravel App on Render..."

cd /var/www/html

# Create storage symlink (public disk)
php artisan storage:link || true

# Clear and rebuild caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations (--force bypasses production prompt)
php artisan migrate --force

# Create supervisor log dir
mkdir -p /var/log/supervisor

echo "==> Launching supervisord (nginx + php-fpm)..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
