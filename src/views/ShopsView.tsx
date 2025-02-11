import Container from "@mui/material/Container";
import { useAppSelector } from "../utils/hooks";
import "../styles/ShopData/ShopView.scss"

function ShopsView() {
    const shops = useAppSelector(state => state.shop.value);

    console.log(shops)

    return (
        <Container className="shops-list-view">
            <h1>Tiendas registradas</h1>
            {
                shops.map((doc) => (
                    <div key={doc.id} className="shop-data">
                        <span className="shop-data__title">{doc.id}</span>
                        <input type="color" value={doc.color} readOnly></input>
                    </div>
                ))
            }
        </Container>
    );
}

export default ShopsView;