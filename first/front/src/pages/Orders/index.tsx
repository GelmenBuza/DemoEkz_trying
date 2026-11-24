

export default function Orders({user, handleBack}) {

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
        </div>
    )
}