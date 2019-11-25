module.exports = {
    "up": "CREATE TABLE accounts_informations (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) UNIQUE NOT NULL, first_name VARCHAR(256) NULL, middle_name VARCHAR(256) NULL, last_name VARCHAR(256) NULL, age INT(11) NULL, birth_date VARCHAR(256) NULL, gender VARCHAR(256) NULL, contact_number INT(20) NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE accounts_informations"
}