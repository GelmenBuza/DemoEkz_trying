import ProductCard from '../../components/ProductCard'
import {catalogLogic} from "../../uttils/catalogLogic.ts";

export default function Catalog({initialDataset, products, orders}) {
    const updatedProducts = catalogLogic(products, orders)
    return (
        <div>
            <div className="page-bar">
                <h1>{initialDataset.catalogTitle}</h1>
            </div>

            {/* TODO: добавьте панель поиска, фильтрации (с «Все категории») и сортировки для user !== null */}
            {/* TODO: вычислите скидку 25% и остатки через src/utils/catalogLogic.js и отрендерите ProductCard */}


            <div className="catalog-list">
                {updatedProducts.map((product) => (<ProductCard product={product}/>))}
            </div>
        </div>
    )
}