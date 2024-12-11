import { useEffect, useState } from "react";
import { db } from "../firebase"; // Importa tu configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import Container from "@mui/material/Container";

function ListDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDocuments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tiendas"));
            const docsList = [];
            querySnapshot.forEach((doc) => {
                console.log(doc.id);
                docsList.push({ id: doc.id, ...doc.data() }); // Agrega el documento y sus datos
            });
            setDocuments(docsList); // Actualiza el estado con los documentos obtenidos
        } catch (error) {
            console.error("Error al obtener los documentos: ", error);
        } finally {
            setLoading(false); // Cambia el estado de carga a false
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    if (loading) {
        return <Container>Cargando documentos...</Container>;
    }

    return (
        <Container>
            <h1>Listado de tiendas registradas</h1>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id}>{doc.id}</li> // Muestra un campo específico, por ejemplo 'name'
                ))}
            </ul>
        </Container>
    );
}

export default ListDocuments;
