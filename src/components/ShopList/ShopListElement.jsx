import "../../styles/ShopList/ShopListElement.scss"
import PropTypes from "prop-types";

function ShopListElement({name, shop}){
    return (
        <div className="shop-list-element">
            <span>{name} --- {shop}</span>
        </div>
    )
}

ShopListElement.propTypes = {
    name: PropTypes.string.isRequired,
    shop: PropTypes.string.isRequired,
}

export default ShopListElement;