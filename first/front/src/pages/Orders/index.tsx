import OrdersView from '../../components/OrdersView'

export default function Orders({user, handleBack, orders, setOrders, products, setProducts, userRole}) {

    return (
        <div className="panel">
            <div className="page-bar">
                <h1>Управление заказами ({user.role_name})</h1>
                <button
                    type="button"
                    className="btn"
                    onClick={handleBack}
                >
                    ← Назад
                </button>
            </div>
            {/* TODO: подключите компонент OrdersView */}
            <OrdersView orders={orders} setOrders={setOrders} products={products} setProducts={setProducts} userRole={userRole}/>
        </div>
    )
}