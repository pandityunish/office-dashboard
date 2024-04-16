# EPASS MANAGEMENT SYSTEM

Epass QR Based Entry Management System

## Table of Contents

- [Overview](#overview)
  - [What is Epass?](#what-is-epass)
  - [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Project](#running-the-project)
  - [Running a Specific Container](#running-a-specific-container)
  - [Accessing the Applications](#accessing-the-applications)
- [API Documentation](#api-documentation)
- [License](#license)

## Overview

Epass is a QR-based entry management system that allows users to easily and securely enter and exit a premises. It is a cloud-based system that can be accessed from anywhere with an internet connection.

### What is Epass?

Epass is a digital pass that is issued to users. The pass contains a QR code that is scanned by a reader at the entrance of the premises. The reader verifies the authenticity of the pass and allows the user to enter.

### Features

Epass offers a number of features, including:

- Secure entry and exit: Epass uses a secure QR code system to verify the authenticity of each pass. This helps to prevent unauthorized access to the premises.
- Easy to use: Epass is easy to use for both users and administrators. Users can simply scan their pass at the entrance to enter the premises. Administrators can manage users and passes from a web dashboard.
- Scalable: Epass is scalable and can be used to manage large numbers of users and passes.

## Getting Started

### Prerequisites

To get started with Epass, you will need the following prerequisites:

- Docker
- Docker Compose

### Installation

1. Clone this repository to your local machine:

   SSH: `git clone git@gitlab.com:societyfintech/epass-codebase.git`
   HTTPS: `git clone https://gitlab.com:societyfintech/epass-codebase.git`

   ```bash
   cd epass-codebase
   ```

2. Build the Docker containers using the following command:

   ```bash
   docker-compose -f compose-dev.yml build
   ```

## Usage

### Running the Project

To run the entire project, including all containers and services, use the following command:

```bash
docker-compose -f compose-dev.yml up
```

### Running a Specific Container

If you want to run only a specific container and access its shell, use the following command as an example:

```bash
docker-compose -f compose-dev.yml exec backend-api-service bash
```

Here's what each part of the command means:

- `docker-compose`: This command is used to manage multi-container Docker applications using a `docker-compose.yml` file.
- `-f compose-dev.yml`: This specifies the Docker Compose file you want to use (in this case, `compose-dev.yml`).
- `exec`: This command is used to execute a command in a running container.
- `backend-api-service`: This is the name of the container you want to run the command in. Replace it with the actual container name.
- `bash`: This is the command you want to execute inside the container. In this example, we're running a Bash shell inside the container.

Remember to replace `backend-api-service` with the name of the container you want to run.

### Accessing the Applications

Once the project is running, you can access the applications using the following URLs:

- Frontend Main Site: [http://localhost:3000](http://localhost:3000)
- Frontend Admin Site: [http://localhost:3001](http://localhost:3001)
- Frontend Organization Site: [http://localhost:3002](http://localhost:3002)
- Frontend Visitor Site: [http://localhost:3003](http://localhost:3003)

Access the backend services using their respective ports:

- Backend Visitor Service: [http://localhost:8001](http://localhost:8001)
- Backend Organization Service: [http://localhost:8002](http://localhost:8002)
- Backend User Service: [http://localhost:8003](http://localhost:8003)
- Backend Admin Service: [http://localhost:8004](http://localhost:8004)

## API Documentation

You can access the API documentation for all backend endpoints using the following routes:

- JSON format: [http://localhost/api-docs/schema-json](http://localhost/api-docs/schema-json)
- Swagger UI: [http://localhost/api-docs/schema-swagger-ui](http://localhost/api-docs/schema-swagger-ui)
- ReDoc: [http://localhost/redoc/schema-redoc](http://localhost/redoc/schema-redoc)

## License

Epass Private License
---

For downloading Docker and Docker Compose:

- Download Docker: [Docker](https://www.docker.com/get-started)
- Download Docker Compose: [Docker Compose](https://docs.docker.com/compose/install/)
```
