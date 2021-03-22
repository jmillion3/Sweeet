INSERT INTO users 
(first, last, email, username, password)
VALUES 
($1, $2, $3, $4, $5)
RETURNING *;