

export default function OrderView({ order, setOrders, products, setProducts, userRole }) {
    const [attention, setAttention] = useState(false)

    return (
        <div key={`order_${order.id}`} className="panel" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {userRole === 'admin' && <button className="btn btn-primary">Редактировать</button>}
                <button className="btn btn-danger">Удалить</button>
            </div>
            <div className="panel">
                <p><strong>Дата заказа:</strong> {order.order_date}</p>
                <p><strong>ФИО клиента:</strong> {order.client_full_name}</p>
                <p><strong>Итоговая сумма:</strong> {order.items.reduce((acc, item) => {
                    return acc + (item.unit_price * item.quantity)
                }, 0)}</p>
            </div>
            <div className="panel">
                <h3 style={{ margin: '0 0 12px 0' }}>Состав заказа:</h3>
                {order.items.map((item, index) => (
                    <div key={`item_${index}`} className="panel" style={{ marginBottom: '12px', marginTop: '8px' }}>
                        <p><strong>Модель:</strong> {item.manufacturer_name} | {item.product_name}</p>
                        <p><strong>Выбранный размер:</strong> {item.size}</p>
                        <p><strong>Количество:</strong> {item.quantity}</p>
                        <p><strong>Цена за единицу:</strong> {item.unit_price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}