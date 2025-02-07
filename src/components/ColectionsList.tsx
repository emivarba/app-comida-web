import Container from "@mui/material/Container";
import { useAppSelector } from "../utils/hooks";

function ListDocuments() {
    
    const shops = useAppSelector(state => state.shop.value);

    return (
        <Container>
            <h1>Listado de tiendas registradas</h1>
            <ul>
                {shops.map((doc) => (
                    <li key={doc.id}>{doc.id}</li> // Muestra un campo específico, por ejemplo 'name'
                ))}
            </ul>
        </Container>
    );
}

export default ListDocuments;
