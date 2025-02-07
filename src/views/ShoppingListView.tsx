import {useEffect, useState} from "react";
import {deleteListItem, fetchShopListItems, ItemShopList} from "../utils/ShopListUtils.js";
import {ShopListElement} from "../components/ShopList/ShopListElement.tsx";
import DialogAddElement from "../components/ShopList/DialogAddElement.js";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid2';
import "../styles/ShopList/ShoppingListView.scss"
import { useAppSelector } from "../utils/hooks.ts";
import { Shop } from "../features/shops/shopsSlice.ts";

function ShoppingListView() {
    const [list_items, setListItems] = useState<ItemShopList[]>([]);
    const [loading, setLoading] = useState(true);
    const [open_dialog, setDialogIsOpen] = useState(false);
    const [list_reload, setListReload] = useState(true);
    const shops = useAppSelector(state => state.shop.value);

    function getShopColor(shop_name: string) {
        const shop_item: Shop | undefined = shops.find(shop => shop.id.toUpperCase() === shop_name.toUpperCase());

        return shop_item ? shop_item.color : "#FFFFFF";
    }

    function handleDelete(id: string){
        deleteListItem(id)
            .then(() => {
                setListReload(!list_reload)
            })
    }

    useEffect(() => {
        setLoading(true);
        fetchShopListItems()
            .then(result_list => {
                setListItems(result_list);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [list_reload]);

    if (loading) {
        return (
            <Container >
                <span>Cargando ...</span>
            </Container>
        );
    }

    return (
        <>
            <Container className="shopping-list-container">
                <h1>Lista de la compra</h1>

                <Button
                    className="button-add"
                    variant="contained"
                    onClick={() => {setDialogIsOpen(true)}}
                >
                    Añadir
                </Button>

                <div style={{ minHeight: '100vh' }}>
                    <Grid container spacing={2} direction="column">
                        <>
                            {list_items.map((item: ItemShopList) => (
                                <ShopListElement
                                    key={item.id}
                                    id={item.id}
                                    shop={item.shop}
                                    name={item.name}
                                    color={getShopColor(item.shop)}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </>
                    </Grid>
                </div>
            </Container>
            <DialogAddElement
                open_dialog={open_dialog}
                setOpen={setDialogIsOpen}
                reloadList={setListReload}
            ></DialogAddElement>
        </>
    );
}

export default ShoppingListView;
