--
-- Date:           6/9/2017 2:05:45 AM
-- Server version: 5.6.17
-- Host:           localhost
-- Database:       skylark
-- User:           root
--

SET NAMES 'utf8';

CREATE SCHEMA `skylark` COLLATE latin1_swedish_ci;

USE `skylark`;

CREATE TABLE `city_details`(
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `city_id` INT(10) UNSIGNED NOT NULL,
  `description` VARCHAR(10000) DEFAULT NULL,
  `area` DECIMAL(5,2) NOT NULL,
  `website` VARCHAR(1000) NOT NULL,
  KEY `rel_city_details_ibfk_1` (`city_id`),
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 5
COLLATE = latin1_swedish_ci
ROW_FORMAT = COMPACT;

CREATE TABLE `coordinates`(
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `lat` DECIMAL(10,6) NOT NULL,
  `lng` DECIMAL(10,6) NOT NULL,
  `city_name` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 5
COLLATE = latin1_swedish_ci
ROW_FORMAT = COMPACT;

ALTER TABLE `city_details` DISABLE KEYS;

INSERT INTO `city_details` VALUES
    (1, 1, 'New Delhi is the capital of India and one of Delhi city\'s 11 districts.', '42.7', 'http://www.ndmc.gov.in'),
    (2, 2, 'Mumbai (formerly called Bombay) is a densely populated city on India’s west coast. A financial center, it\'s India\'s largest city.', '603', 'http://www.mcgm.gov.in'),
    (3, 3, 'Chennai, on the Bay of Bengal in eastern India, is the capital of the state of Tamil Nadu.', '426', 'http://www.chennaicorporation.gov.in/'),
    (4, 4, 'Kolkata (formerly Calcutta) is the capital of India\'s West Bengal state. Founded as an East India Company trading post, it was India\'s capital under the British Raj from 1773–1911.', '185', 'http://www.kmcgov.in');

ALTER TABLE `city_details` ENABLE KEYS;

ALTER TABLE `coordinates` DISABLE KEYS;

INSERT INTO `coordinates` VALUES
    (1, NULL, NULL, 'New Delhi'),
    (2, NULL, NULL, 'Mumbai'),
    (3, NULL, NULL, 'Chennai'),
    (4, NULL, NULL, 'Kolkata');

ALTER TABLE `coordinates` ENABLE KEYS;

ALTER TABLE `city_details` ADD FOREIGN KEY `rel_city_details_ibfk_1` (`city_id`) REFERENCES `coordinates` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
