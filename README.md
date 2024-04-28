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

## User Instructions / Features:

To access the website navigate to [url]. Once on the page, the user can navigate between different pages using the LHS menu.

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

# Developer Instructions

When developing, it is advisable to utilise a Docker container for the database and to then manually launch the Java backend and React frontend. This approach enables real-time updates to the frontend whenever modifications are made. Setup instructions for this are below.

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

`"proxy": "[http://backend:8080](http://backend:8080/)"`

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

`./ETSystem`

Start the backend by entering the command:

`./gradlew bootRun`

**Starting the front end:**

Navigate to:

`./et-system-frontend`

Run `npm instal` to install required dependencies

Run `npm start` to start the frontend

Navigate to `[localhost:3000](http://localhost:3000)` on your chosen web browser to access the website.