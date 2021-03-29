module.exports = {
    cartNew: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const [cart] = await db.cart.cart_new(user_id)
        res.status(200).send(cart);
    },
    cartAdd: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {p_id} = req.params;
        const addCart = await db.cart.cart_add(user_id, p_id);
        res.status(200).send(addCart)
    },
    cartDelete: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {p_id} = req.params;
        const deleteCart = await db.cart.cart_delete(user_id, p_id);
        res.status(200).send(deleteCart)
    },
    cartGet: async (req, res) => {
        const db = req.app.get('db');
        // console.log(req.session)
        const {user_id} = req.session.user;
        const getCart = await db.cart.get_cart(user_id);
        res.status(200).send(getCart);
    }
}