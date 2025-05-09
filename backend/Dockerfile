# Use a lightweight Python base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock into the container
COPY Pipfile Pipfile.lock /app/

# Install system dependencies and pipenv
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/* \
    && pip install pipenv

# Install Python dependencies via Pipenv
RUN pipenv install --deploy --ignore-pipfile

# Copy the application code into the container
COPY . /app/

# Set environment variables for Flask
ENV FLASK_APP=predict.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5002

# Expose the port Flask will run on
EXPOSE 5002

# Command to run the Flask app
CMD ["pipenv", "run", "flask", "run"]
