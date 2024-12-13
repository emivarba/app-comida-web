import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {addListItem, fetchShopListItems} from "../utils/ShopListUtils.js";
import Button from "@mui/material/Button";
import ShopListElement from "../components/ShopList/ShopListElement.jsx";
import Grid from '@mui/material/Grid2';
import "../styles/ShopList/ShoppingListView.scss"
import {Dialog} from "@mui/material";
import DialogAddElement from "../components/ShopList/DialogAddElement.jsx";

function ShoppingListView() {
    const [list_items, setListItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open_dialog, setDialogIsOpen] = useState(false);
    const [list_reload, setListReload] = useState(true);

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
                            {list_items.map((item) => (
                                <ShopListElement
                                    key={item.id}
                                    shop={item.shop}
                                    name={item.name}
                                />
                            ))}
                        </>
                    </Grid>
                </div>
            </Container>
            <DialogAddElement
                open_dialog={open_dialog}
                setOpen={setDialogIsOpen}
            ></DialogAddElement>
        </>
    );
}

export default ShoppingListView;
