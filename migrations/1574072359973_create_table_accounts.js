module.exports = {
    "up": "CREATE TABLE accounts (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(256) UNIQUE NOT NULL, email VARCHAR(256) UNIQUE NOT NULL, password VARCHAR(256) NOT NULL, type VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE accounts"
}