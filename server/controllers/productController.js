module.exports = {
    getProducts: async (req, res) => {
        const db = req.app.get('db');
        const products = await db.products.get_products()
        res.status(200).send(products);
    },
    getProduct: async (req, res) => {
        const db = req.app.get('db');
        const {p_id} = req.body;
        const product = await db.products.get_product(p_id)
        res.status(200).send(product)
    }
}