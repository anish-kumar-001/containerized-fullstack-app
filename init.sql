CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO users (name, email) VALUES ('Anish kumar', 'anish@gmail.com');
INSERT INTO users (name, email) VALUES ('Akhil', 'akhil@gmail.com');