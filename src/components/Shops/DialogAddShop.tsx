
import {SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { GenericDialogForm } from "../Generics/GenericDialogForm.tsx";
import { addShop } from "../../utils/ShopUtils.ts";


interface DialogAddShopParams {
    openDialog: boolean,
    setOpen: (status: boolean) => void,
    reloadList: () => void,
}


function DialogAddShop({openDialog, setOpen, reloadList}: DialogAddShopParams) {
    const [form_data, setFormData] = useState({
        name: '',
        color: '',
    });

    function handleFormChange( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSaveProduct = async (): Promise<boolean> => {
        const result = await addShop({id: form_data.name, color: form_data.color})
            
        if(result) {
            setFormData({
                name: "",
                color: "",
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
                <span>Nombre</span>
                <TextField
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                    value={form_data.name}
                    onChange={handleFormChange}
                />
            </Grid>
            <Grid>
                <p>Color</p>
                <input
                    id="color"
                    name="color"
                    type="color"
                    value={form_data.color}
                    onChange={handleFormChange}
                ></input>
                <p>Código de color: {form_data.color || ""}</p>
            </Grid>
        </Grid>

    return(
        <GenericDialogForm
            open={openDialog}
            title="Añadir tienda"
            onSave={handleSaveProduct}
            onClose={handleModalClose}
        >
            {formContent}
        </GenericDialogForm>
    )
}

DialogAddShop.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    reloadList: PropTypes.func.isRequired,
}

export default DialogAddShop;