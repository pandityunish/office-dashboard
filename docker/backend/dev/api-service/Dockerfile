# Use an official Python runtime as a parent image
FROM python:3.11-slim

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

# Run the command to start the Django development server
RUN python manage.py migrate

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]