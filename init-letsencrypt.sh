#!/bin/bash

# Check if docker-compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# Define your domains, rsa_key_size, data_path, email, and staging settings
domains=(epass.com.np www.epass.com.np)
rsa_key_size=4096
data_path="/var/opt/certbot"
email="cody.manish@gmail.com" # Add your valid email address here
staging=1 # Set to 1 if you're testing your setup to avoid hitting request limits

# Check if data_path directory exists
if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

# Install the required packages
sudo apt install certbot nginx

# Start the Nginx service
sudo systemctl start nginx

# Request Let's Encrypt certificate for $domains
sudo certbot certonly --webroot -w /var/www/certbot \
    -t nginx \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal

# Reload the Nginx service
sudo systemctl reload nginx

# Exit the script
exit 0