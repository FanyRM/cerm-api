-- MYSQL
CREATE TABLE users (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  lastname VARCHAR(250) NOT NULL,
);

CREATE TABLE tasks (
  id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(250) NOT NULL,
  priority BOOLEAN NOT NULL,
  user_id SMALLINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, lastname) VALUES
('Rafael', 'Pérez');

INSERT INTO tasks (name, description, priority, user_id) VALUES
('Completar proyecto', 'Finalizar el desarrollo del API REST', 1, 1),
('Revisar código', 'Hacer code review del módulo de usuarios', 0, 1);
