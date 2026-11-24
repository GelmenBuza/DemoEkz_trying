export default function ProductCard({product}) {
    console.log(product)


    return (
        <div className={`product-card ${product.count <= 3 && 'low-stock'}`}>
            <img src={`${product.image}` || './picture.png'} alt={product.name} className='product-thumb'/>
            <div>
                <p className="product-title">{product.name}</p>
                <div className='product-meta'>
                    <span>{product.category_name}</span>
                    <span>{product.count > 5 ? 'много': 'мало'}</span>
                    <span>{product.composition}</span>
                </div>
            </div>

            {
                product.discount ?
                    (
                        <div className='product-price-col'>
                            <span className='price-old'>
                                {product.base_price}
                            </span>
                            <span className='price-current'>
                                {+product.base_price * 0.75}
                            </span>
                        </div>
                    )
                    :
                    (
                        <div className='product-price-col'>
                            <span className='price-current'>
                                {product.base_price}
                            </span>
                        </div>
                    )
            }

        </div>
    )
}