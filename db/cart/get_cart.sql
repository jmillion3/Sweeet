SELECT * FROM cart c
JOIN products p ON p.p_id = c.p_id
WHERE user_id = $1;