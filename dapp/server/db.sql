-- CREATE DATABASE rou;
SHOW DATABASES;
USE rou;
CREATE TABLE users (
	id              INT unsigned NOT NULL AUTO_INCREMENT, 	# Unique ID for the record
	name            VARCHAR(150) NOT NULL,                	# Name of the user
	lastname        VARCHAR(150) NOT NULL,                	# Last name of the user
	email           VARCHAR(150) NOT NULL,                	# Email of user
    username  		VARCHAR(50) NOT NULL,					# username
    password		VARCHAR(50) NOT NULL,					# password
	PRIMARY KEY     (id)                                  	# Make the id the primary key
);

SHOW TABLES;
DESCRIBE users;