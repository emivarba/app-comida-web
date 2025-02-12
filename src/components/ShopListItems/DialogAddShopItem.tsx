
import {Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import {addListItem} from "../../utils/ShopListUtils.ts";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector } from "../../utils/hooks.ts";
import { GenericDialogForm } from "../Generics/GenericDialogForm.tsx";


interface DialogAddShopItemParams {
    openDialog: boolean,
    setOpen: (status: boolean) => void,
    reloadList: () => void,
}


function DialogAddShopItem({openDialog, setOpen, reloadList}: DialogAddShopItemParams) {
    const shops = useAppSelector((state) => state.shop.value)

    const [form_data, setFormData] = useState({
        product: '',
        shop: '',
        shop_color: '#FFFFFF',
    });

    function handleFormChange( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

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

    function handleModalClose() {
        reloadList();
        setOpen(false);
    }

    const formContent =
        <Grid container spacing={2} direction="column">
            <Grid >
                <span>Producto</span>
                <TextField
                    required
                    margin="dense"
                    id="product"
                    name="product"
                    placeholder="Producto"
                    fullWidth
                    value={form_data.product}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid>
                <span>Tienda</span>
                <Select
                    id="shop"
                    name="shop"
                    fullWidth
                    value={form_data.shop}
                    onChange={handleFormChange}
                    variant="outlined"
                >
                    {shops.map((shop) => (
                        <MenuItem
                            key={shop.id}
                            value={shop.id}
                        >
                            {shop.id}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>

    return(
        <GenericDialogForm
            open={openDialog}
            title="Añadir elemento"
            onSave={handleSaveProduct}
            onClose={handleModalClose}
        >
            {formContent}
        </GenericDialogForm>
    )
}

DialogAddShopItem.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    reloadList: PropTypes.func.isRequired,
}

export default DialogAddShopItem;