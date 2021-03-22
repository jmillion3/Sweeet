SELECT user_id, first, last, email, username
FROM users
WHERE username = $1;