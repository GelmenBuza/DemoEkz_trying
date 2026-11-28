

export default function DraftItemsView({ draftItems, setDraftItems, setOpenDraftMenu, handleConfirmOrder }) {


    return (
        <div className="modal-bg">
            <div className="panel" style={{ 'width': '50%', 'position': 'relative' }}>
                <button className="btn" style={{ 'position': 'absolute', 'top': '5px', 'right': '5px' }} onClick={() => setOpenDraftMenu(false)}>Х</button>

                <h2>Черновик заказа</h2>
                <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '10px' }}>
                    {draftItems.length !== 0 ? (
                        <>
                            <p>Наименование - количество</p>
                            {
                                draftItems.map((item, index) => (
                                    <div key={`draft-item-${index}`}>
                                        <p>{item.product_name} {item.variant} - {item.quantity}</p>
                                    </div>
                                ))
                            }
                            <button className="btn btn-danger" onClick={() => setDraftItems([])}>Очистить корзину</button>
                            <button className="btn btn-primary" onClick={() => handleConfirmOrder()}>Оформить заказ</button>
                        </>
                    ) : (
                        <h3>Предметов нет</h3>
                    )}
                </div>
            </div >
        </div>
    )
}