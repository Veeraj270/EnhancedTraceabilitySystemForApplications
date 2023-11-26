# Enhanced Traceability System

## Summary

The goal of the project is to develop a comprehensive system for the tracking of the production of Cakesmiths baked goods from their beginnings as raw ingredients, to their point of sale. 

## Expectation of finalizes product
The aim is to provide a piece of desktop software that provides accurate tracking of the production process, easy information retrieval, and intuitive visualization on the efficiency of their production lines. Aside from the desktop application, the system will also require an auxiliary platform for the real-time input of data during the production and delivery processes.

The intended use of the software is for warehouse & factory staff to be able to log the delivery of goods to their premises, and then log further information regarding the production & sale of Cakesmiths products. This data will then be available to directors & managers in such a way that they can clearly visualize the provenance of all products and the day to day efficiency of their operations. At most, the only personal data that might be required will be that of email addresses, passwords, and role for the creation of user accounts.
## MVP
A simple stock control system that stores information about a product at every stage of its production. Can be database initially without a UI for now. Some statistics for directors.

## User Stories
- As a baker, I want a recipe system, so I can enhance my baking process. <br>
- As a warehouse worker, I want a delivery database, so I can track deliveries. <br>
- As a manager, I want an approved supplier system, so I can insert suppliers and incoming deliveries.

## Developer Instructions
### Starting Database

**Prerequisites**

- Docker Engine: <a name="docker-engine">https://docs.docker.com/engine/install/</a>
  
**Instructions**

Pull the postgres image:

```docker pull postgres```

Create docker network to attatch containers to:

```docker network create --subnet=172.18.0.0/16 mynet```

Create postgres container with the relevant environment variables that is attatched to the mynet network:

```docker run -d --ip 172.18.0.2 -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=etsystemdatabase --name=postgres_con postgres```

**Useful docker commands**

Inspect a container:

```docker inspect <container>```

Remove all containers from docker:

``` docker rm -f $(docker ps -aq)```

Remove a network from docker:

```docker network remove <name of network>```

### Starting Backend

- Navigate to /ETSystem
- Clean the build directory and then build the project from scratch:  ```./gradlew clean build```
- Run ETSystem via: ```./gradlew bootRun```
- The back end should now be running

### Starting the Front-End
- Navigate to /et-system-front-end.
- Run ``` npm install``` to install required dependencies.
- Run ``` npm start``` to launch graphical user interface.

