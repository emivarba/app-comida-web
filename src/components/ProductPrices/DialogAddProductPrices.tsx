import { useState } from "react";
import { addListItem } from "../../utils/ShopListUtils";
import { GenericDialogForm } from "../Generics/GenericDialogForm";


interface DialogAddShopItemParams {
    openDialog: boolean,
    setOpen: (status: boolean) => void,
    reloadList: () => void,
}

function DialogAddProductPrices({openDialog, setOpen, reloadList}: DialogAddShopItemParams) {
    const [form_data, setFormData] = useState({
            product: '',
            shop: '',
            shop_color: '#FFFFFF',
    });

    function handleModalClose() {
        reloadList();
        setOpen(false);
    }
    
    const handleSaveProduct = async (): Promise<boolean> => {
            const result = await addListItem({name: form_data.product, shop: form_data.shop})
                
            if(result) {
                setFormData({
                    ...form_data,
                    product: '',
                });
            }
    
            return result;
    };

    return(
        <GenericDialogForm
            open={openDialog}
            title="Añadir producto"
            onSave={handleSaveProduct}
            onClose={handleModalClose}
        >
            <div className="container">
                <input type="text" placeholder="Nombre producto"></input>
                <div className="prueba">
                    <input type="text" placeholder="Tienda"></input>
                    <input type="number" placeholder="Precio"></input>
                    <button>+</button>
                </div>
            </div>
        </GenericDialogForm>
    )
}

export default DialogAddProductPrices