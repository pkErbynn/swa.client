# Swa

A web application built with Angular and .NET. The application allows users to view a list of items, add new items, and perform concurrent data processing on each item.

## Prerequisites
Before starting with the setup, ensure you have the following tools installed on your machine:

- Node.js and npm
- Angular CLI
- .NET SDK

## Setup
### Angular
Step 1: Clone the project Repositories

```bash
$ git clone https://github.com/pkErbynn/swa.client.git
```

Step 2: Navigate to the project directory and install dependencies

```bash
$ cd swa.client
$ npm install
```

Step 2: Run the app

```bash
$ ng serve --open
```
Automatically or manually open a web browser and navigate to http://localhost:4200.


### .NET Backend
Step 1: Clone the project Repositories

```bash
$ git clone https://github.com/pkErbynn/swa.api.git
```

Step 2: Navigate to the project directory and restore dependencies

```bash
$ cd swa.api
$ dotnet restore
$ dotnet build
```

Step 3: Run the .NET app

```bash
$ dotnet run
```

Open a tool like Postman or use a web browser to access the API at `http://localhost:5291/api/Items`.
The api can be verified using Swagger `http://localhost:5291/swagger/index.html`

## Usage
1. Add items to the in-memory db using the Angular UI or the Swagger explorer
2. The UI will be displaying the list of items
3. If the backend is not up, an error message will be shown
4. Once the items are populated, the concurrent data processing can be triggered using the 'Process Items Concurrently' button
    - If the factorial is 0, click the button again

