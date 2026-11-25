import { catalogLogic } from "../../uttils/catalogLogic.ts";
import ProductDetail from '../../components/ProductDetail' 

export default function Detail({selectedProductId, handleBack, products, orders, user, setDraftItems}) {

    const updatedProducts = catalogLogic(products, orders)

    const selctedProduct = products.filter(product => product.id === selectedProductId)[0]

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
            <ProductDetail product={selctedProduct} user={user} setDraftItems={setDraftItems}/>
        </div>
    )
}