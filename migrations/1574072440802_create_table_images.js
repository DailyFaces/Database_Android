module.exports = {
    "up": "CREATE TABLE images (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) NOT NULL, url VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE images"
}