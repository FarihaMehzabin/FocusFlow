CREATE DATABASE `FocusFlow`;

CREATE TABLE FocusFlow.`journal_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `moods` varchar(255) DEFAULT NULL,
  `resulted_mood` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE FocusFlow.`prompt_response` (
  `id` int NOT NULL AUTO_INCREMENT,
  `journal_id` int DEFAULT NULL,
  `question_no` int DEFAULT NULL,
  `prompt_response` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);



CREATE TABLE FocusFlow.`lofi_tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trackname` varchar(255) DEFAULT NULL,
  `track_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE FocusFlow.`meditation_tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trackname` varchar(255) DEFAULT NULL,
  `track_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE FocusFlow.`session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guid` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE FocusFlow.`tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `section_status` varchar(255) DEFAULT NULL COMMENT 'which section it belongs to',
  `reminder` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

CREATE TABLE FocusFlow.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_journal_entries`(IN userId INT)
BEGIN
SELECT 
    FocusFlow.journal_entries.moods,
    FocusFlow.journal_entries.id,
    FocusFlow.journal_entries.resulted_mood,
    FocusFlow.journal_entries.created_at
  FROM 
    FocusFlow.journal_entries 
  WHERE 
    FocusFlow.journal_entries.user_id = userId;

    END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_journal_entry`(IN p_user_id INT, IN p_moods VARCHAR(255), IN p_resulted_mood VARCHAR(255), IN p_created_at DATETIME, IN p_responses JSON)
BEGIN
  DECLARE v_index INT DEFAULT 1;
  DECLARE v_count INT;
  DECLARE v_response VARCHAR(255);

  -- Insert into journal_entries
  INSERT INTO journal_entries(user_id, moods, resulted_mood, created_at) 
  VALUES (p_user_id, p_moods, p_resulted_mood, p_created_at);

  SET @journal_id = LAST_INSERT_ID();

  -- Get the count of responses
  SET v_count = JSON_LENGTH(p_responses);

  -- Loop through each response
  WHILE v_index <= v_count DO
    -- Extract the response
    SET v_response = JSON_EXTRACT(p_responses, CONCAT('$[', v_index - 1, ']'));

    -- Insert into prompt_response
    INSERT INTO prompt_response(journal_id, question_no, prompt_response) 
    VALUES (@journal_id, v_index, v_response);

    SET v_index = v_index + 1;
  END WHILE;

END$$
DELIMITER ;
