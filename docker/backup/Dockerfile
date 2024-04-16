# backup/Dockerfile

FROM python:3.11

# Install necessary packages
RUN apt-get update && \
    apt-get install -y postgresql-client openssh-client && \
    rm -rf /var/lib/apt/lists/*

# Copy the backup script to the container
COPY bakcup/backup_script.py /app/backup_script.py
RUN chmod +x /app/backup_script.py

# Set the working directory
WORKDIR /app

# Run the backup script using CMD
CMD ["python", "backup_script.py"]