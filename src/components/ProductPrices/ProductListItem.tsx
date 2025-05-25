import { useState } from "react";
import { ProductPrices } from "../../utils/PricesUtils"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ProductListItemParams {
    product: ProductPrices
}

function ProductListItem({product}: ProductListItemParams) {
    const [renderPriceTable, setRenderPriceTable] = useState<boolean>(false);
    const [bestShop, bestPrice] = getBestPrice(product.currentPrices);

    function getBestPrice(prices: object) {
        const bestPrice = Object.entries(prices).reduce((min, entry) => entry[1] < min[1] ? entry : min ,["", Infinity]);

        return bestPrice
    }

    function manageClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();

    }

    function showPriceTable(render: boolean) {
        if(render) {
            return (
            <>
            <table className="product-list__price-table" border={1} >
                <thead>
                    <tr>
                        {
                            Object.keys(product.currentPrices).map(shopName => (
                                <th key={shopName}>{shopName}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            Object.values(product.currentPrices).map(shopPrice => (
                                <td key={shopPrice}>{shopPrice}€</td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
            <button className="primary-button" onClick={manageClick}>Cambiar precios</button>
            </>
            
            )
        }

        return null;
    }

    return(
        <div className="product-list__item" key={product.id} onClick={() => setRenderPriceTable(!renderPriceTable)}>
            <span className="product-list__name">{product.productName}</span>
            <span className="product-list__best-price">
                {`${bestShop}: ${bestPrice}€`}
                {
                    renderPriceTable ? <ExpandLessIcon /> :<ExpandMoreIcon />
                }
                
            </span>
            {showPriceTable(renderPriceTable)}
        </div>
    )
}

export default ProductListItem