# Server setup

## Pre-requisites

1. Postgresql.
2. Node.

## Local Setup

1. Clone the repository
2. ```bash
   cd baquent-test # change directory into the cloned respository
   ```
3. ```bash
   npm i # installs all required dependencies
   ```
4. make a development.env file and define the variables as described in .env.example
5. ```bash
   npm run dev # run the API in development mode
   ```

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```

src/
├─ api/
│ ├─ service/
│ │ ├─ controller.js
│ │ ├─ helper.js
│ │ ├─ index.js
│ │ └─ queries.js
│ └─ index.js
├─ services/
│ ├─ express/
│ ├─ knex/
│ └─ websocket/
├─ app.js
├─ config.js
└─ index.js

```

### db/migrations

All migrations are defined here.

### src/api/index.js

This is the main entry point of all APIs and the will redirected based on thier routes to their respective modules.

#### src/api/service/controller.js

This is the service API controller file. It defines the main router middlewares which use the API model.

#### src/api/service/index.js

This is the entry file of the service API. It defines the routes, and the use of controller along the route.

#### src/api/service/queries.js

This is where the queries are defined to be used in the repective controller.

#### src/api/service/helper.js

This is where the helper functions are defined to be used in the respective controller or respective queries.

### src/services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.

```

```

```

```
