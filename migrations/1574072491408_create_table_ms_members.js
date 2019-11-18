module.exports = {
    "up": "CREATE TABLE ms_members (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ms_group_id INT(11) NOT NULL, account_id INT(11) NOT NULL, status VARCHAR(256) NOT NULL, created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL, deleted_at TIMESTAMP NULL)",
    "down": "DROP TABLE ms_members"
}