import Button from "@mui/material/Button";
import {Alert, Dialog, Slide, Snackbar, TextField} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {addListItem} from "../../utils/ShopListUtils.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DialogAddElement({open_dialog, setOpen}) {
    let form_content;

    const [loading, setLoading] = useState(false);
    const [alert_data, setAlertData] = useState({
        type: "",
        message: "",
        is_open: false,
    });
    const [form_data, setFormData] = useState({
        product: '',
        shop: '',
    });

    const handleFormChange = (event) => {
        const {name, value} = event.target;

        setFormData({
            ...form_data,
            [name]: value,
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = () => {
        setAlertData({
            ...alert_data,
            is_open: false,
        })
    };

    const handleSaveProduct = () => {
        setLoading(true);

        addListItem({name: form_data.product, shop: form_data.shop})
            .then(result => {
                if (result) {
                    setAlertData({
                        message: "Producto añadido correctamente",
                        type: "success",
                        is_open: true,
                    })
                }

            }).finally( () => {
                setFormData({
                    product: '',
                    shop: '',
                });
                setLoading(false);
            });
    };

    form_content = <Container>
        <Grid container spacing={2} direction="column">
            <Grid xs={12}>
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
            <Grid xs={12}>
                <span>Tienda</span>
                <TextField
                    required
                    margin="dense"
                    id="shop"
                    name="shop"
                    placeholder="Tienda"
                    fullWidth
                    value={form_data.shop}
                    onChange={handleFormChange}
                />
            </Grid>
        </Grid>
    </Container>

    if (loading) {
        form_content = <span> Cargando...</span>
    }

    return(
        <Dialog
            fullScreen
            open={open_dialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        X
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Añadir elemento
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSaveProduct}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>

            {form_content}
            <Snackbar
                open={alert_data.is_open}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alert_data.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert_data.message}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}

DialogAddElement.propTypes = {
    open_dialog: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}

export default DialogAddElement;