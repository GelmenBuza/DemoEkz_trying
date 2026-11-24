

export default function Detail({selectedProductId, handleBack}) {

    return (
        <div className="panel">
            <div className="page-bar">
                <h1>Карточка товара (ID: {selectedProductId})</h1>
                <button
                    type="button"
                    className="btn"
                    onClick={handleBack}
                >
                    ← Назад
                </button>
            </div>
            {/* TODO: подключите компонент ProductDetailView */}
        </div>
    )
}