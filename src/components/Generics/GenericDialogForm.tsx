import { Alert, AppBar, Button, Container, Dialog, IconButton, Slide, Snackbar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
  ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

interface GenericDialogFormProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onSave: () => Promise<boolean>;
    children: React.ReactNode;
}

interface AlertData {
    type: "success" | "info" | "warning" | "error";
    message: string;
    isOpen: boolean;
}

export function GenericDialogForm({open, title, onClose, onSave, children}: GenericDialogFormProps){
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState<AlertData>({
        type: "success",
        message: "",
        isOpen: false,
    });


    const handleSave = () => {
        setLoading(true);
        onSave()
          .then((success) => {
            setAlertData({
              message: success ? 'Operación realizada correctamente' : 'Ocurrió un error',
              type: success ? 'success' : 'error',
              isOpen: true,
            });
          })
          .finally(() => setLoading(false));
      };

      const handleAlertClose = () => {
        setAlertData((prev) => ({ ...prev, isOpen: false }));
      };

      return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                {title}
              </Typography>
              <Button disabled={loading} color="inherit" onClick={handleSave}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
    
          <Container sx={{ paddingTop: '15px' }}>
            {loading ? <span>Cargando...</span> : children}
          </Container>
    
          <Snackbar open={alertData.isOpen} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={alertData.type} variant="filled" sx={{ width: '100%' }}>
              {alertData.message}
            </Alert>
          </Snackbar>
        </Dialog>
      );
}