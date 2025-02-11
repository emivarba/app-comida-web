import Container from "@mui/material/Container";
import { useFetch } from "../utils/hooks";
import "../styles/ShopData/ShopView.scss"
import DialogAddShop from "../components/Shops/DialogAddShop";
import { useState } from "react";
import { fetchShops } from "../utils/ShopUtils";
import { Shop } from "../features/shops/shopsSlice";

function ShopsView() {
    const [openDialog, setDialogIsOpen] = useState(false);
    const [listReload, setListReload] = useState(true);

    const {data: shops, loading} = useFetch<Shop[]>(fetchShops, listReload)
    
    function manualReload(){
        setListReload(!listReload)
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
        <Container className="shops-list-view">
            <h1>Tiendas registradas</h1>
            <div style={{marginBottom: "10px"}}>
                <button className="primary-button" onClick={() => {setDialogIsOpen(true)}}>Añadir</button>
            </div>
            {
                shops.map((doc) => (
                    <div key={doc.id} className="shop-data">
                        <span className="shop-data__title">{doc.id}</span>
                        <input type="color" value={doc.color} readOnly></input>
                    </div>
                ))
            }
        </Container>
        <DialogAddShop
            openDialog={openDialog}
            setOpen={setDialogIsOpen}
            reloadList={manualReload}
        ></DialogAddShop>
        </>
        
    );
}

export default ShopsView;