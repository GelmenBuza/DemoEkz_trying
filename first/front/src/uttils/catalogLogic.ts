export function catalogLogic(products, orders) {
    const month = new Date().getMonth();
    const idInOrder = []

    const updatedProduct = products

    orders.forEach(order => {
        if (+order["order_date"].split('-')[1] === month) {
            order.items.find(item => {
                idInOrder.push(item.id);
            })
        }
    })

    updatedProduct.map((product) => {
        product.count = product.variants.reduce((acc, ell) => acc + ell.quantity, 0);
        product.discount = product.id in idInOrder;
    })

    return updatedProduct;
}

