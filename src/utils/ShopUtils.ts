import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.ts";
import { Shop } from "../features/shops/shopsSlice.ts";

export const fetchShops = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Tiendas"));
        const docsList: Shop[] = [];

        querySnapshot.forEach((doc) => {
            docsList.push({ id: doc.id, ...(doc.data() as Omit<Shop, "id">) });
        });
        
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }
};