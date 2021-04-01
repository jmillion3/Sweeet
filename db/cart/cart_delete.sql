DELETE FROM cart
WHERE user_id = $1
AND cart_id = $2;