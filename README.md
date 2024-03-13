# Enhanced Traceability System

By Izzeldeen Abumatar, Veeraj Bhagwat, Matthew Cudby, and Josif Trenchovski, under mentorship of Tom Burt-Gray.

## Summary

The goal of the project is to develop a comprehensive system for the tracking of the production of Cakesmiths baked goods from their beginnings as raw ingredients, to their point of sale, to aid in conforming to the [Government's Standards for Traceability](https://www.food.gov.uk/business-guidance/managing-food-safety#traceability).

## Expectation of Final Product
The aim is to provide a piece of desktop software that provides accurate tracking of the production process, easy information retrieval, and intuitive visualization on the efficiency of their production lines. Aside from the desktop application, the system will also require an auxiliary platform for the real-time input of data during the production and delivery processes.

The intended use of the software is for warehouse & factory staff to be able to log the delivery of goods to their premises, and then log further information regarding the production & sale of Cakesmiths products. This data will then be available to directors & managers in such a way that they can clearly visualize the provenance of all products and the day to day efficiency of their operations. At most, the only personal data that might be required will be that of email addresses, passwords, and role for the creation of user accounts.

## Minimum Viable Product [MVP]
A simple stock control system that allows users:
- Add ingredients to the database.
- Add products, "produced" from these ingredients into the database.
- View all products currently on the database
- Use a basic traceability page, that can search for the intermediary ingredients of a product and list them in a tree diagram
- View the history of any product conceptualised as a series of **events** in chronological order.

## User Stories
- As a **warehouse staff member**, I'd like to be able to scan and log the arrival of raw ingredients into the system such
  that we accurately tracker the inventory from the moment it arrives at our premises.
- As a **production line baker**, I want a user-friendly interface that allows us to pick from a list of previously defined
  recipes and log exactly which ingredients were used in the production of the product. I'd like to be able to input data
  regarding loss and waste during the production process.
- As a **company director**, I want a system that provides key insights into the efficiency of our production process via
  intuitive data graphics. Also, I want the system to be able to provide in depth traceability data on any finished product
  that was produced on our premises.
- As a **user** across all levels, I want the system to have an intuitive graphical interface that makes for easy navigation
  and data interpretation thus reducing the risk of human error and improving overall operational efficiency.
- As a **system administrator**, I want a robust account system with multiple levels of seniority along with robust security
  features that ensure employees are able to and only able to access features relevant to their role.
- As a **government employee**, in the case that a batch of Cakesmiths pbitcoinroducts causes members of the public to fall ill, I
  want the Cakesmiths' directors to be able to produce traceability data that can be proven to have not been doctored. Possible
  use case of blockchain technology.

## Tech Stack
### Frontend
- HTML, CSS, JavaScript
- React JS

### Backend

- Java (Spring Boot Framework)
- PostgresSQL

### Dev Tools
- Docker
- Git
- Gradle
- NPM
- GitHub, GH Actions and GH Projects

## Developer Instructions

### Via Docker Compose

The database, frontend, and backend can be started in tandem using Docker Compose.

**Prerequisites**

- Docker Engine: <a name="docker-engine">https://docs.docker.com/engine/install/</a>

**Instructions**

- In the `./ETSystem` directory, run `./gradlew bootJar` to build the backend.
- Start Docker (e.g. via Docker Desktop).
- In the `./docker/` directory, run `docker compose up`.
- After initialization, access the website through `localhost:3000`.

### Manually Starting Database

**Prerequisites**

- Docker Engine: <a name="docker-engine">https://docs.docker.com/engine/install/</a>

**Instructions**

Pull the postgres image:

```
docker pull postgres
```

Create docker network to attatch containers to:

```
docker network create --subnet=172.18.0.0/16 mynet
```

Create postgres container with the relevant environment variables that is attatched to the mynet network:

```
docker run -d --ip 172.18.0.2 -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=etsystemdatabase --name=postgres_con postgres
```

**Useful docker commands**

Inspect a container:

```
docker inspect <container>
```

Remove all containers from docker:

```
docker rm -f $(docker ps -aq)
```

Remove a network from docker:

```
docker network remove <name of network>
```

### Manually Starting Backend

- Navigate to `./ETSystem`.
- Clean the build directory and then build the project from scratch:  `./gradlew clean build`.
- Run ETSystem via: `./gradlew bootRun`.
- The back end should now be running.

### Manually Starting the Front-End

- Navigate to `./et-system-front-end`.
- Run `npm install` to install required dependencies.
- Run `npm start` to start the website.
- Open `localhost:3000` to access the website.

A manually started frontend also supports *hot-reloading*: when source files are changed, the website will automatically reload the files and refresh.