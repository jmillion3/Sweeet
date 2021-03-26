INSERT INTO cart
(user_id, p_id)
VALUES
($1, $2)
RETURNING *;