import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";

export const fetchShops = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Tiendas"));
        const docsList = [];
        querySnapshot.forEach((doc) => {
            docsList.push({ id: doc.id, ...doc.data() });
        });
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }
};