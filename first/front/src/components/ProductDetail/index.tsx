
export default function ProductDetail({ product, user, setDraftItems }) {
    // const handleSelectVariant
    return (
        <div className="panel detail-grid">
            <img src={product.image} alt={product.name} className="detail-image" />
            <div>
                <h1 className="product-title">{product.name}</h1>
                <p className="product-meta">Категория: {product.category_name}</p>
                <p className="product-meta">Производитель: {product.manufacturer_name}</p>
                <p className="product-meta">Материалы: {product.composition}</p>
                <p className="product-meta">{product.description}</p>
                <p className="product-meta">Остаток: {product.count}</p>
                <div className="product-price-col">
                    <span className={product.discount ? "price-old" : "price-current"}>{product.base_price}</span>
                    {product.discount && <span className="price-current">{product.base_price * 0.75}</span>}
                </div>
                <div className="size-buttons">
                    {product.variants.map(variant => (
                        <button className="size-btn" disabled={variant.quantity === 0} key={variant.size}>
                            {variant.size}
                        </button>
                    ))}
                </div>
            </div>
            {user && (
                <h3>Сделать заказ</h3>
            )}
        </div>
    )
}