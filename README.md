## Full Stack User Management App (3-Tier Containerized Stack)

This project demonstrates a fully containerized, 3-tier application stack using **Node.js/Express** for the API, **MySQL** for data persistence, and a static **HTML/CSS/JS frontend** served by **Nginx**, all orchestrated with **Docker Compose**.

It is a strong showcase of practical skills in web development and DevOps.

---

### Project Architecture & Components

The application is composed of three distinct services, each running in its own Docker container and communicating over a single, internal Docker network:

| Component | Technology | Role | Network Address |
| :--- | :--- | :--- | :--- |
| **Database** | MySQL 8.0 | Stores user data (`id`, `name`, `email`). Initialized with `init.sql`. | `mysql-container:3306` |
| **Backend API** | Node.js (Express) | Provides REST endpoints (`/data`, `/users/add`). Uses service discovery for database connection. | `backend:5000` |
| **Frontend** | HTML/CSS/JS (served by Nginx) | The client-side application for viewing and adding users. | Accessed locally at `localhost:8080` |

---

### Key Engineering & DevOps Features

* **Service Discovery:** The frontend connects to the API using the service name `http://backend:5000`, relying on Docker's built-in DNS.
* **Startup Dependency Management:** The backend's entrypoint (`sleep 10`) ensures the database container is fully ready before the Node.js app attempts to connect, guaranteeing reliable startup.
* **Configuration as Code:** All service environment variables, volumes, and ports are managed declaratively in the `docker-compose.yml`.
* **Data Persistence:** A named volume (`mysql-data`) is used to ensure database data is retained across container restarts.

---

### How to Run Locally

#### Prerequisites
You must have **Docker** and **Docker Compose** installed on your machine.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/anish-kumar-001/containerized-fullstack-app.git]
    cd full-stack-app
    ```

2.  **Start the Full Stack:**
    This command will build the necessary Docker images, create the network, and start all three services in detached mode (`-d`).
    ```bash
    docker compose up --build -d
    ```

3.  **Access the Application:**
    Open your web browser and navigate to the Nginx frontend:
    **👉 `http://localhost:8080`**

4.  **Stop and Clean Up:**
    To stop the services and remove the containers, network, and persistent data volume:
    ```bash
    docker compose down -v
