module.exports = {
    "up": "CREATE TABLE feeds (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) NOT NULL, details VARCHAR(256) NOT NULL, type VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE feeds"
}