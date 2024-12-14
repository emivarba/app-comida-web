import "../../styles/ShopList/ShopListElement.scss"
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function ShopListElement({id, name, shop, color, handleDelete}){
    function deleteListItem() {
        handleDelete(id)
    }

    return (
        <div className="shop-list-element" style={{backgroundColor: color, borderColor: color}}>
            <div>
                <p className="item-name">{name}</p>
                <span className="shop-name">{shop}</span>
            </div>
            <div>
                <IconButton
                    onClick={deleteListItem}
                    color="error"
                    aria-label="delete"
                    size="large"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}

ShopListElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shop: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default ShopListElement;