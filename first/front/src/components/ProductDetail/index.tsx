import {useState} from "react";
import {v4 as uuidv4} from 'uuid'

export default function ProductDetail({product, user, setDraftItems}) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setQuantity(1);
    };

    const addDraftItem = () => {
        if (!selectedVariant) return;
        
        setDraftItems((prev) => {
            const newArr = prev.map((item) => {
                if (item.product_id === product.id && item.variant_id === selectedVariant.id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
            });
            
            if (newArr.length === prev.length) {
                newArr.push({
                    id: uuidv4(),
                    variant_id: selectedVariant.id,
                    product_id: product.id,
                    product_name: product.name,
                    manufacturer_name: product.manufacturer_name,
                    variant: selectedVariant.size,
                    quantity: quantity,
                    unit_price: product.discount ? product.base_price * 0.75 : product.base_price,
                });
            }
            
            return newArr;
        });
        
        setSelectedVariant(null);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(value > 0 ? value : 1);
    };

    return (
        <div className="panel detail-grid">
            <img src={product.image || './picture.png'} alt={product.name} className="detail-image"/>
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
                        <button 
                            className={`size-btn ${selectedVariant?.id === variant.id ? 'active' : ''}`} 
                            disabled={variant.quantity === 0} 
                            key={variant.size}
                            onClick={() => handleVariantSelect(variant)}
                        >
                            {variant.size}
                        </button>
                    ))}
                </div>
            </div>
            {user && (
                <div className="order-section">
                    {selectedVariant && (
                        <div className="variant-selection">
                            <h3>Выбран вариант: {selectedVariant.size}</h3>
                            <div className="quantity-control">
                                <label htmlFor="quantity">Количество:</label>
                                <input 
                                    type="number" 
                                    id="quantity"
                                    min="1" 
                                    value={quantity} 
                                    onChange={handleQuantityChange}
                                    className="input"
                                />
                            </div>
                            <button 
                                className="btn btn-primary" 
                                onClick={addDraftItem}
                                disabled={selectedVariant.quantity < quantity}
                            >
                                Добавить в черновик заказа
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}