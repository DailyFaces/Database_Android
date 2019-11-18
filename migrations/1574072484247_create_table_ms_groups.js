module.exports = {
    "up": "CREATE TABLE ms_groups (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, account_id INT(11) NOT NULL, title VARCHAR(256) NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE ms_groups"
}