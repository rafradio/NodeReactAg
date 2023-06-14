DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
	id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255),
    last_name VARCHAR(255),
	email VARCHAR(255),
    date_created date NULL,
    date_updated date NULL
);

INSERT INTO authors (first_name, last_name, email) VALUES 
('Александр', 'Пушкин', 'pushkin@mail.ru'),
('Михаил', 'Лермонтов', 'misha@gmail.com'),
('Сергей', 'Есенин', 'serg@yandex.ru');

DROP TABLE IF EXISTS books;

CREATE TABLE books (
	id SERIAL PRIMARY KEY, 
    bookname VARCHAR(255),
    author INT,
    date_created date NULL,
    date_updated date NULL,
	CONSTRAINT fk_author
	   FOREIGN KEY(author) 
	   REFERENCES authors(id)
	   ON DELETE CASCADE
	   ON UPDATE CASCADE
);

INSERT INTO books (bookname, author) VALUES 
('Герой нашего времени', '2'),
('Евгений Онегин', '1'),
('Сказка о царе Салтане', '1'),
('Дубровский', '1');

INSERT INTO books (bookname, author) VALUES
('Бородино', '2');

INSERT INTO books (bookname, author) VALUES
('Мцыри', '2'),
('Капитанская дочка', '1');

INSERT INTO books (bookname, author) VALUES
('Узник', '2'),
('Маскарад', '2'),
('Княгиня Лиговская', '2'),
('Станционный смотритель', '1'),
('Метель', '1'),
('Пиковая дама', '1'),
('Метель', '3'),
('Не гляди на меня с упреком', '3');



