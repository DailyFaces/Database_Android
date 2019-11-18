module.exports = {
    "up": "CREATE TABLE reactions (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) NOT NULL, feed_id INT(11) NOT NULL, type VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE reactions"
}