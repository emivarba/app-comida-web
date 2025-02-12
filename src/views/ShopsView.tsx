import Container from "@mui/material/Container";
import { useFetch } from "../utils/hooks";
import "../styles/ShopData/ShopView.scss"
import DialogAddShop from "../components/Shops/DialogAddShop";
import { useState } from "react";
import { deleteShop, fetchShops, updateShop } from "../utils/ShopUtils";
import { replaceShopList, Shop } from "../features/shops/shopsSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

function ShopsView() {
    const dispatch = useDispatch<AppDispatch>();
    const [openDialog, setDialogIsOpen] = useState(false);
    const [listReload, setListReload] = useState(true);

    const {data: shops, loading, setData: setShops} = useFetch<Shop[]>(fetchShops, listReload)
    
    function manualReload(){
        setListReload(!listReload)
    }

    function handleDelete(id: string){
        deleteShop(id)
            .then(() => {
                setShops(prev => prev.filter(item => item.id !== id))
            })
    }

    function handleColorChange(event: React.ChangeEvent<HTMLInputElement>){
        const {id, value } = event.target;
        
        updateShop(id, {"color": value})
            .then( () => {
                setShops(prevShops =>
                    prevShops.map(shop =>
                      shop.id === id ? { ...shop, color: value } : shop
                    )
                );

                dispatch(replaceShopList(shops));  
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
        <Container className="shops-list">
            <h1>Tiendas registradas</h1>
            <div style={{marginBottom: "10px"}}>
                <button className="primary-button" onClick={() => {setDialogIsOpen(true)}}>Añadir</button>
            </div>
            {
                shops.map((doc) => (
                    <div key={doc.id} className="shops-list__item">
                        <span className="shops-list__name">{doc.id}</span>
                        <input
                            name="color"
                            id={doc.id}
                            className="shops-list__color-picker" 
                            type="color" 
                            value={doc.color} 
                            onChange={handleColorChange}
                        ></input>
                        <button 
                            onClick={() => handleDelete(doc.id)} 
                            className="shops-list__delete-btn"
                        >
                            <DeleteIcon />
                        </button>
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