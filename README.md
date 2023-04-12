# 🧠 Culture Challenge

## 🚀 Description

This is a gamification application.The purpose of the app is to improve knowledge by answering questions.Every user can answer to questions and can create questions. He receives tokens and badges depending on his progress.The questions are on different levels of difficulty.The questions are on different levels of difficulty. Users must hurry to answer the questions because when a question is answered by a user, that question is no longer valid.

## 🖥️ Technologies
* `Angular`
* `Typescript`
* `HTML & SCSS`
* `Spring Boot`
* `SQL Server`
* `Java`

## 🛠️ Prerequisites:

Java 11 or higher

Node.js and npm installed

Angular CLI installed

API:

Clone the project repository from the Git hosting service of your choice.Link is [here](https://github.com/Piciorus/AccesaInternshipGamification-API).
Navigate to the backend directory of the project in your terminal or command prompt.
Run ./mvnw clean install to build the project and download the necessary dependencies.
Run ./mvnw spring-boot:run to start the server. The server will run on http://localhost:8080 by default.The server port can be changed by modifying the server.port property in the application.properties file.

WEB:

Clone the project repository from the Git hosting service of your choice.Link is [here](https://github.com/Piciorus/AccesaInternshipGamification-Web).
Navigate to the frontend directory of the project in your terminal or command prompt.
Run npm install to download the necessary dependencies.
Run ng serve to start the frontend server. The server will run on http://localhost:4200 by default.


## 🏹 Usage

After run the spring boot application and the web application.Open the http://localhost:4200. 
When the application starts the login page is displayed.Go to register page to create an account and after that login.Then you are redirected to the home page where the questions you can answer are displayed.In the navigation bar there are buttons to the ranking and questions pages. In ranking you can see the ranking and where you are,based on the tokens you own. In questions you can add a new question.

## 🗝️ API architecture


The following is the top-level directory structure:
* Domain
   * Entities-persist information in the database
   * Mapper-converts entities to models and reverse
   * Models-consist of Data Transfer Objects
* Repository-store models in database
* Service-consist in business logic layer
* Controller-this is presentation layer,where are defined endpoints
* Config-contain the configuration files for the entire application
	
⚙️ Database layer: The database layer stores data in a structured format that can be easily accessed and queried by the application layer.The application layer sends requests for data to the database layer through the data access layer. 

⚙️ Data layer: The data access layer is responsible for interacting with the data storage system, such as a database or file system.This will contain all entities, enums, exceptions, interfaces, types and logic specific to this layer.It provides an interface for the application layer to read and write data to the storage system.

⚙️ Business logic layer: This layer is responsible for implementing the business logic of the software system. It receives data from the presentation layer, processes it, and sends it to the data access layer for storage.This contains the interfaces of the services, that are used in the API layer, the services implementation, all the helpers classes, custom exceptions, guard clauses, domain events, handlers, basically all the business of the application.

⚙️ Presentation layer: The presentation layer is the topmost layer of a software system, responsible for rendering user interfaces and interacting with users. It communicates with the business logic layer to receive and send data.

⚙️ Client: The client refers to the user interface or the front-end of the application. It is responsible for presenting data and information to the user and for accepting user inputs.


## 🗝️ WEB architecture
The following is the top-level directory structure:

* Assets - global static assets like photos, svgs
* Environments- store environment-specific settings for an application..
* Shared-contains reusable code that can be used across multiple components, modules or services in the application.
* App- contains following folders:
    * Apps:contains all the components from the application,organized in modules.
    * Auth:contains the login and register component
    * Core:contains the layout with the header and routing to all components
    * Libs:contains the services,models,interceptors,used for communicate with the backend

![alt text](https://github.com/Piciorus/Photos/blob/main/diagram1.png)<br/><br/><br/>

## 💻 User Interface
![alt text](https://github.com/Piciorus/Photos/blob/main/login.png)<br/><br/><br/>
![alt text](https://github.com/Piciorus/Photos/blob/main/registerpng.png)<br/><br/><br/>
![alt text](https://github.com/Piciorus/Photos/blob/main/login3.png)<br/><br/><br/>
![alt text](https://github.com/Piciorus/Photos/blob/main/home2.png)<br/><br/><br/>
![alt text](https://github.com/Piciorus/Photos/blob/main/ranking1.png)<br/><br/><br/>
![alt text](https://github.com/Piciorus/Photos/blob/main/quest1.png)<br/><br/><br/>


