import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {addListItem, fetchShopListItems} from "../utils/ShopListUtils.js";

function ShoppingList() {
    const [list_items, setListItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getListItems() {
        setLoading(true);
        const list = await fetchShopListItems();
        setListItems(list);
        setLoading(false);
    }

    async function addListItems() {
        setLoading(true);
        await addListItem({name: "Prueba", shop: "Tiendecita"})
        setLoading(false);
    }

    useEffect(() => {
        getListItems();
    }, []);

    if (loading) {
        return (
            <Container >
                <span>Cargando ...</span>
            </Container>
        );
    }

    return (
        <Container>
            <h1>Lista de la compra</h1>
            <ul>
                {list_items.map((item) => (
                    <li key={item.id}>
                        {item.name} {item.shop}
                    </li>
                ))}
            </ul>
        </Container>
    );
}

export default ShoppingList;
