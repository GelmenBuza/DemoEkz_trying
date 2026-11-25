import ProductCard from '../../components/ProductCard'
import {catalogLogic} from "../../uttils/catalogLogic.ts";
import {useState} from 'react'

export default function Catalog({
                                    initialDataset,
                                    products,
                                    orders,
                                    categories,
                                    user,
                                    navigateTo,
                                    setSelectedProductId
                                }) {
    const [search, setSearch] = useState('')
    const [filterId, setFilterId] = useState('')
    const [sortType, setSortType] = useState('off')

    const updatedProducts = catalogLogic(products, orders)

    const categoriesArr = ['Все категории', ...categories]

    const filteredProducts = updatedProducts
        .filter((product) => {
            const flags = {filterFlag: true, searchFlag: true}

            if (filterId && filterId !== 'Все категории') {
                flags.filterFlag = product.category_id === parseInt(filterId);
            }

            if (search) {
                flags.searchFlag = product.name.toLowerCase().includes(search.toLowerCase())
            }

            return flags.filterFlag && flags.searchFlag;
        }).sort((a, b) => {
            if (sortType === 'off') return 0
            const aPrice = a.discount ? a.base_price * 0.75 : a.base_price
            const bPrice = b.discount ? b.base_price * 0.75 : b.base_price
            if (aPrice > bPrice) {
                return sortType === 'toTop' ?
                    1
                    :
                    -1
            } else {
                return sortType === 'toTop' ?
                    -1
                    :
                    1
            }
        });


    function handleClick(id) {
        setSelectedProductId(id)
        navigateTo('detail')
    }

    return (
        <div>
            <div className="page-bar">
                <h1>{initialDataset.catalogTitle}</h1>
            </div>

            {/* TODO: добавьте панель поиска, фильтрации (с «Все категории») и сортировки для user !== null */}
            {/* TODO: вычислите скидку 25% и остатки через src/utils/catalogLogic.js и отрендерите ProductCard */}

            {user !== null && (
                <div className='filters-bar'>
                    <input className='input' onChange={(e) => setSearch(e.target.value)} value={search}
                           placeholder="Поиск по названию"/>

                    <select name="" className="select" onChange={(e) => setFilterId(e.target.value)}>
                        {categoriesArr.map((category, index) => (
                            <option key={index}
                                    value={category?.id || (category === 'Все категории' && '')}>{category?.name || category}</option>
                        ))}
                    </select>

                    <select name="" className="select" onChange={e => setSortType(e.target.value)}>
                        <option value="off">Без сортировки</option>
                        <option value="toLow">По убыванию</option>
                        <option value="toTop">По возрастанию</option>
                    </select>
                </div>
            )}


            <div className="catalog-list">
                {filteredProducts
                    .map((product) => (<ProductCard key={product.id} product={product} handleClick={handleClick}/>))}
            </div>
        </div>
    )
}