FROM python:3.11-alpine

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app/backend/api_service

# Copy the requirements file into the container at /app/
COPY backend/api_service/requirements.txt /app/backend/api_service

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app/
COPY backend/api_service /app/backend/api_service

# Expose the application port
EXPOSE 8000

# Make migrations
CMD ["python", "manage.py", "makemigrations"]

# Migrate the database
CMD ["python", "manage.py", "migrate"]

# Collect static files
CMD ["python", "manage.py", "collectstatic"]

# Run the command to start the Django application in production mode
CMD ["gunicorn", "api_service.wsgi:application", "--bind", "0.0.0.0:8000"]