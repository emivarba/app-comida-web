import { useState } from "react";
import { GenericDialogForm } from "../Generics/GenericDialogForm";
import { saveProductPrice } from "../../utils/PricesUtils";
import AddIcon from "@mui/icons-material/Add";

interface DialogAddShopItemParams {
    openDialog: boolean,
    setOpen: (status: boolean) => void,
    reloadList: () => void,
}

function DialogAddProductPrices({openDialog, setOpen, reloadList}: DialogAddShopItemParams) {
    const [productInput, setProductInput] = useState({ shop: '', price: '', productName: ''});
    const [stores, setStores] = useState(new Map());

    function handleModalClose() {
        reloadList();
        setOpen(false);
    }
    
    async function handleSaveProduct(): Promise<boolean>{
        const currentPrices = Object.fromEntries(stores);
        console.log(currentPrices);

        const params = {
            categoryName: "",
            currentPrices: currentPrices,
            productName: productInput.productName,
        }

        const result = await saveProductPrice(params)

        return result

    };

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setProductInput(prev => ({...prev, [name]: value}))
    }

    function addProductPrice() {
        if (productInput.shop && !stores.has(productInput.shop)) {
          const newStores = new Map(stores);
          newStores.set(productInput.shop, Number(productInput.price));
          setStores(newStores);
          setProductInput({ shop: '', price: '' , productName: productInput.productName});
        } else {
          alert('La tienda ya existe o el campo está vacío');
        }
    };

    return(
        <GenericDialogForm
            open={openDialog}
            title="Añadir producto"
            onSave={handleSaveProduct}
            onClose={handleModalClose}
        >
            <div className="container">
                <div className="product-name">
                    <h4>Nombre del producto</h4>
                    <input
                        className="primary-input"
                        type="text" 
                        placeholder="Nombre producto"
                        name="productName"
                        value={productInput.productName}
                        onChange={handleInputChange}
                    ></input>
                </div>
                
                <div className="product-data">
                    <div className="product-data__titles">
                        <h4>Tienda</h4>
                        <h4>Precio</h4>
                    </div>
                    <input
                        className="primary-input product-data__shop"
                        type="text" 
                        placeholder="Tienda"
                        name="shop" 
                        value={productInput.shop}
                        onChange={handleInputChange}
                    ></input>
        
                    <input
                        className="primary-input product-data__price"
                        type="number" 
                        placeholder="Precio" 
                        name="price"
                        value={productInput.price}
                        onChange={handleInputChange}
                    ></input>
                    <button className="icon-button" onClick={addProductPrice}><AddIcon /></button>
                </div>
            </div>
        </GenericDialogForm>
    )
}

export default DialogAddProductPrices