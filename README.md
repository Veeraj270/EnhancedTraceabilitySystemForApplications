# Enhanced Traceability System

## Introduction

The objective of the project it build an enhanced traceability system that allows an industrial baker like [Cakesmiths](https://www.cakesmiths.com/)
to track the production of their baked goods from their beginnings as delivered ingredients the point of sale. Given the scope of the
project and the given development time it is a proof of concept rather than a complete application.


The project was expected to be in direct collaboration with Cakesmiths, however they removed themselves from the 
University of Bristol Software Engineering Project, for unknown reasons. The project was then continued based of the initial brief they 
provided. 

The system features a web application that consists of an inventory system, customer orders page, deliveries system, take deliveries page,
recipes system, and traceability page. The system is designed to provide accurate tracking of the production process, easy information retrieval,
and intuitive visualization on the efficiency of their production lines.


### User Stories

- As a **warehouse staff member**, I’d like to be view incoming deliveries and log the arrival of new ingredients into our warehouse s.t. that we can track and
record when and what was delivered.


- As a **baker**, I want to be able to pick products from a list of what needs to be baked. I then want to be able to record how much of each ingredient I
used during the production of the selected products.


- As a **company director**, I want a system that provides a clear key insights into the efficiency of our production process via intuitive data representation.
I also want the system to allow for the visualisation of the events tied to any product s.t. I can clearly decipher the series of events that lead to contamination
in the event that this occurs.


- As a **user across all levels**, I want the system to have an intuitive GUI that makes for easy navigation of the system. Thus improving overall operational
efficiency.

## User Instructions / Features:

To access the website navigate to [url] at which the system is hosted. Once on the page, the user can navigate between different pages using the LHS menu.

- **Inventory System -** Allows you to search the inventory by product label, ID, or GTIN (if it was a delivered ingredient). You can click on individual
table rows to bring up details about the product, including a view of the recent events associated with the product.


- **Customer Orders Page -** Allows you to view all customer orders, view what the client has ordered for each, and trigger the auto-generation of an
order to suppliers that includes the ingredients required to bake the ordered products.


- **Deliveries System -** It allows you to view all scheduled incoming deliveries and cancel them if needed. You can select deliveries and press
“process” in order to begin taking in the delivery.


- **Take Deliveries Page -** It allows you to view the items expected for delivery. Scan the barcodes of the delivered items and submit the delivery 
to the backend.


- **Recipes System -** Allows the user to view and add recipes to the system.


- **Traceability Page -** Allows the user to search for a specific product by its ID. The displayed node-link graph shows what specific products
were used as ingredients during the baking of the product. When the user selects a specific node on the graph, an event
history shows on the bottom RHS, which details the events that have occurred in relation to the product in chronological order.

### Baking System

- **Page 1 -** The LHS table shows the baked goods that need baking. The user can select which ones they plan to bake. As the
user selects cakes, the ingredients required to bake them are added up. Pressing “Start Baking” takes the user to page 2.


- **Page 2 -** The user can scan the barcodes of the ingredients they are using and enter the amount of the scanned product
that they have used. Once all the required ingredients have been weighed out and recorded, the user can press “Finished”
to take them to page 3.


- **Page 3:** Once the user has finished actually baking all of the baked goods, they finish the baking process by selecting
each ingredient, scanning its barcode, and weighing it so that its new weight can be recorded. Pressing submit triggers the submission of all data 
related to the baking process to the backend.

## Tech Stack
### Frontend
- HTML, CSS, JavaScript, TypeScript
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

The system can either be run using *Docker Compose* or manually. Manual running is advised, since it allows for hot-reloading of the frontend and faster restarts overall, but requires more computer-specific setup; running through Docker Compose may be easier, and is more similar to the production environment, but will have slower restarts and is more resource-intensive overall.

### Manually Running

**Prerequisites**

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- You have installed [Gradle](https://gradle.org/install/).
- You have installed [Docker](https://docs.docker.com/get-docker/).
- You have installed [Node.js and npm](https://nodejs.org/en/download/).
- You have a basic understanding of Java, Spring Boot, Gradle, JavaScript, npm, React, and TypeScript.

**Getting Started**

When developing, it is advisable to utilise a Docker container for the database, though using a system-wide Postgres installation is possible.

**Edit back end properties files**

Navigate to:

`ETSystem/src/java/resources/application.properties`

Replace the line:

`spring.datasource.url=jdbc:postgresql://db/etsystemdatabase`

With:

`spring.datasource.url=jdbc:postgresql://localhost:5432/etsystemdatabase`

**Edit front end package.json**

Navigate to:

`et-system-frontend/src/package.json`

Replace the line:

`"proxy": "http://backend:8080"`

With:

`"proxy": "http://localhost:8080"`

**Note:** These changes will need to reverted when pushing to a branch intended for release.

**Starting the database:**

Once docker is installed begin by pulling the postgres image:

`docker pull postgres`

Create a docker network to attach containers to:

`docker network create --subnet=172.18.0.0/16 db`

Create a postgres container to hold the database:

`docker run -d --network=db --ip 172.18.0.2 -p 5432:5432 -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=etsystemdatabase --name=postgres_con postgres`

**Starting the backend:**

Navigate to:

`/ETSystem`

Start the backend by entering the command:

`./gradlew bootRun`

**Starting the front end:**

Navigate to: `/et-system-frontend`

Run `npm install` to install required dependencies

Run `npm start` to start the frontend

Navigate to [`localhost:3000`](http://localhost:3000) on your chosen web browser to access the website.

### Running via Docker Compose

**Prerequisites**

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- You have installed [Gradle](https://gradle.org/install/).
- You have installed [Docker](https://docs.docker.com/get-docker/).
- You have a basic understanding of Java, Spring Boot, Gradle, JavaScript, npm, React, and TypeScript.

**Running**

Run the commands:
```shell
cd ./ETSystem/
./gradlew bootJar
cd ../docker/
docker compose up --build
```

This may take some time, especially on the first run. After the system finishes starting up, navigate to [`localhost:3000`](http://localhost:3000) on your chosen web browser to access the website.

The database will be wiped on each restart.

### Deployment

We use AWS for deployment:
- Docker images of the backend and frontend are stored on our Elastic Container Registry (ECR) instance, and automatically pushed by a GitHub workflow.
- [`ecs-cli`](https://github.com/aws/amazon-ecs-cli) is used to setup a VM cluster to run the containers.
- `ecs-cli` is then used to deploy our containers, using a modified `docker-compose.yml` along with `ecs-params.yml`.

Assuming you have already authenticated with our AWS account and do not already have a cluster, run the commands:
```shell
cd ./docker/aws/
ecs-cli up --capability-iam --region eu-west-2 --size 2 --instance-type t2.medium
# Wait...
ecs-cli compose up
# Wait...
ecs-cli compose ps
```

You may be able to use smaller containers or clusters; these parameters were found via trial and error, with the main limiting factor being the RAM usage of the frontend.

Expect to wait a long time after most `ecs-cli` commands. The final command, `compose ps`, will show you the IP address of your frontend; expect output like:
```
Name                                                  State    Ports                         TaskDefinition  Health
cd-cluster/73466ffbf346486ca81cd24a69a624a4/backend   RUNNING  3.10.203.244:8080->8080/tcp   aws:13          HEALTHY
cd-cluster/73466ffbf346486ca81cd24a69a624a4/db        RUNNING  3.10.203.244:32768->5432/tcp  aws:13          HEALTHY
cd-cluster/73466ffbf346486ca81cd24a69a624a4/frontend  RUNNING  3.10.203.244:3000->3000/tcp   aws:13          UNKNOWN
```

If you're working with a new cluster and not reusing an existing one, you'll need to adjust the security group settings to allow users to connect to the site. The created EC2 VMs share a security group; to this group, add an Inbound Rule that allows TCP traffic from all IP addresses to the ports 3000 and 8080.

To view logs for the servers, open the AWS Consolve, then go to CloudWatch > Log groups > ets > either `frontend/frontend/<hash>`, `backend/backend/<hash>`, or `db/db/<hash>` as appropriate.

To shut down the deployed server, use:
```shell
ecs-cli compose down
```

To shut down the cluster, use:
```shell
ecs-cli down
```

Note that you **do not need to re-create the cluster to update the deployed version**. Assuming the images have been updated, it is sufficient to restart the servers:
```shell
ecs-cli compose down
ecs-cli compose up
```

Budget usage is dictated by the cluster being up, so take it down while not in use.

To run this on a different AWS account, you will need to:
- Edit `/aws/docker-compose.yml` to refer to your own container registry.
- Create an IAM role with the `CloudWatchFullAccessV2` and `AmazonEC2ContainerRegistryFullAccess` permission policies, and either name it `ETS-CD` or modify `ecs-params.yml` to refer to your role's name.
- For GitHub actions to automatically push to your registry, set up [OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) for your AWS account for your repo.

## Group Members

| Member  | Account                                                    |
|---------|------------------------------------------------------------|
| Matthew | [@matthewcudby22896](https://github.com/matthewCudby22896) |
| Veeraj  | [@Veeraj270](https://github.com/Veeraj270)                 |
| Luna    | [@l-Luna](https://github.com/l-Luna)                       |
| Luna    | [@qc22435](https://github.com/qc22435)                     | 

Under the mentorship of Tom Burt-Gray.
