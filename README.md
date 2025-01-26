# E-Commerce Product Catalog

<p align="center">
  

  <h3 align="center">CD-ECOM</h3>

  <p align="center">
    A basic CRUD application demonstrating an E-Commerce Product Catalog with Authentication and Authorization.
    <br />
    <br />
    <a href="#">View Demo</a>
  </p>
</p>


---

## About The Project

The **E-Commerce Product Catalog** is a simple CRUD application designed to demonstrate proficiency in:

- **Backend**: Built using Python and Django.
- **Frontend**: Developed with React and Node.js.
- **Database**: Uses SQLite for simplicity.
- **DevOps**: Demonstrates Dockerized deployment with CI/CD integration

This project enables users to:
- Authenticate and authorize themselves.
- Create, view, update, and delete product entries in a catalog.
- Search and filter through products efficiently.

### Built With

The application is containerized using Docker and utilizes the following technologies:

- **[Django](https://www.djangoproject.com/)**: A high-level Python web framework that enables rapid development of secure and scalable web applications. Used for the backend to handle authentication, database management, and API endpoints.

- **[React.js](https://reactjs.org/)**: A JavaScript library for building user interfaces. React is used to create a dynamic and responsive frontend for the application, providing features like product listing, search, and a user-friendly shopping cart.

- **[SQLite](https://www.sqlite.org/index.html)**: A lightweight, self-contained SQL database engine. It is used to store and manage product data, user credentials, and other necessary information in a simple yet effective manner.

- **[Docker](https://www.docker.com/)**: A platform for containerizing the application to ensure consistency across different environments. Docker is used to package the backend, frontend, and database into isolated containers.

- **[Nginx](https://www.nginx.com/)**: A high-performance web server and reverse proxy server. Nginx is used to handle requests efficiently and serves the React build files as static assets in production, ensuring scalability and improved performance.

---

## Getting Started

This section explains how to set up the project for local development.

### Prerequisites

- **Ubuntu18.04+**
- **Node.js**: [Install Node.js](https://nodejs.org/)
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Running the application

**Clone the Repository**:

    ```sh
    git clone https://github.com/pradeepreddyDev/cd-ecom-task.git
    cd cd-ecom-task

## Development Mode

To run the application in development mode, use the `./run_dev.sh` script. This mode is designed for rapid iteration with hot reloading, allowing for live updates as you make changes to the code.

    ```sh
    sudo chmod +x run_dev.sh
    ./run_dev.sh

    Frontend: http://localhost
    Backend: http://localhost:8000/admin



## Production Mode

To run the application in production mode, use the `./run_prod.sh` script. This mode is optimized for high performance and stability in a production environment.

    ```sh
    sudo chmod +x run_prod.sh
    ./run_prod.sh

    Frontend: http://localhost
    Backend: http://localhost:8000/admin

### Key Features of Production Mode:
- **Backend**: The Django application is served using **Gunicorn**, a Python WSGI HTTP server. Gunicorn is highly efficient, capable of handling multiple concurrent requests with its worker processes, making it well-suited for production deployments.
- **Frontend**: The React application is built into optimized static files using `npm run build`. These files are then served by **Nginx**, which is configured to act as a reverse proxy and serve static assets efficiently.
- **Performance**: Using Gunicorn for the backend and Nginx for serving static files significantly improves the application's response times and scalability. 
- **Scalability**: The architecture ensures that the backend and frontend operate independently but are integrated seamlessly through the reverse proxy.


# Testing the application

    ```sh
    docker exec django-backend python manage.py test

# Create Super user

    ```sh
    docker exec -it django-backend python manage.py createsuperuser   


# Database Schema

Below is the database schema used in the project.

## Product Table

| Field         | Type            | Description                                   |
|---------------|-----------------|-----------------------------------------------|
| `sku`         | `VARCHAR(50)`   | Unique identifier for the product.            |
| `product_name`| `VARCHAR(100)`  | Name of the product.                          |
| `price`       | `DECIMAL(10, 2)`| Product price with up to 2 decimal places.    |
| `description` | `TEXT`          | Detailed product description.                 |
| `category`    | `VARCHAR(50)`   | Product category.                             |
| `featured`    | `BOOLEAN`       | Whether the product is featured or not.       |
| `stock`       | `INTEGER`       | Number of items in stock.                     |
| `reviews`     | `INTEGER`       | Number of reviews for the product.            |
| `stars`       | `FLOAT`         | Product rating (out of 5).                    |
| `colors`      | `JSON`          | JSON field to store color options.            |
| `created_by`  | `INTEGER (FK)`  | Foreign key referencing the user who created the product. |

## ProductImage Table

| Field       | Type            | Description                                  |
|-------------|-----------------|----------------------------------------------|
| `id`        | `INTEGER`       | Primary key (auto-incremented).              |
| `product_id`| `INTEGER (FK)`  | Foreign key referencing the product table.   |
| `image`     | `VARCHAR`       | Path to the product image file.              |

---

## Usage


- **Create Products**: Add new products to the catalog via the admin panel.
- **Edit/Delete Products**: Manage your product entries through the admin panel.
- **View Products**: Browse or search for products on the frontend.
- **Fetch Product Details**: View detailed information about a specific product.
- **Search Products**: Search and filter products by category, color, and price range.
- **Add to Cart**: Users can add products to their cart, with authentication required only for accessing the cart page to ensure secure transactions.

---

## Contact

**Pradeep** - [LinkedIn](https://www.linkedin.com/in/pradeep-reddy-dev/) - pradeep.nagireddy@gmail.com
