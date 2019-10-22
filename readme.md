# Calendar Event

Calendar Event is an app for creating an event using Laravel and Vuejs Frameworks.

## Installation
Install all the dependencies using composer

    composer install
    
Install all the dependencies using yarn or npm for Frontend

    yarn install 
        or 
    npm run install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve
    
Start the local development server

    yarn dev
        or
    yarn watch

You can now access the server at http://localhost:8000

## License

The Laravel framework is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
