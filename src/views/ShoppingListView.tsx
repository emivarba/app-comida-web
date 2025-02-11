import {useState} from "react";
import {deleteListItem, fetchShopListItems, ItemShopList} from "../utils/ShopListUtils.js";
import {ShopListElement} from "../components/ShopListItems/ShopListElement.tsx";
import DialogAddShopItem from "../components/ShopListItems/DialogAddShopItem.js";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid2';
import "../styles/ShopList/ShoppingListView.scss"
import { useAppSelector, useFetch } from "../utils/hooks.ts";
import { Shop } from "../features/shops/shopsSlice.ts";

function ShoppingListView() {
    const [openDialog, setDialogIsOpen] = useState(false);
    const [listReload, setListReload] = useState(true);
    const shops = useAppSelector(state => state.shop.value);

    const {data: shopsList, loading, setData: setShopsList} = useFetch<ItemShopList[]>(fetchShopListItems, listReload)

    function getShopColor(shop_name: string) {
        const shop_item: Shop | undefined = shops.find(shop => shop.id.toUpperCase() === shop_name.toUpperCase());

        return shop_item ? shop_item.color : "#FFFFFF";
    }

    function manualReload(){
        setListReload(!listReload)
    }

    function handleDelete(id: string){
        deleteListItem(id)
            .then(() => {
                setShopsList(prev => prev.filter(item => item.id !== id))
            })
    }

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
                <div className="title-container">
                    <h1>Lista de la compra</h1>

                    <Button
                        className="button-add"
                        variant="contained"
                        onClick={() => {setDialogIsOpen(true)}}
                    >
                        Añadir
                    </Button>
                </div>
                
                <Grid container spacing={2} direction="column">
                    {
                    shopsList.map((item: ItemShopList) => (
                        <ShopListElement
                            key={item.id}
                            id={item.id}
                            shop={item.shop}
                            name={item.name}
                            color={getShopColor(item.shop)}
                            handleDelete={handleDelete}
                        />
                    ))
                    }
                </Grid>
            </Container>
            <DialogAddShopItem
                openDialog={openDialog}
                setOpen={setDialogIsOpen}
                reloadList={manualReload}
            ></DialogAddShopItem>
        </>
    );
}

export default ShoppingListView;
