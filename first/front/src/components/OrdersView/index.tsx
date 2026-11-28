import OrderView from "../OrderView"

export default function OrdersView({ orders, setOrders, products, setProducts, userRole }) {
    console.log(orders)

    return (
        <div className="panel">
            <button className="btn btn-primary">Создать заказ</button>
            {orders.map((order) => (
                <OrderView key={`order_${order.id}`} order={order} setOrders={setOrders} products={products} setProducts={setProducts} userRole={userRole} />
            ))}
        </div>
    )
}