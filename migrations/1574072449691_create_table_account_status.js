module.exports = {
    "up": "CREATE TABLE account_status (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) NOT NULL, status VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE account_status"
}