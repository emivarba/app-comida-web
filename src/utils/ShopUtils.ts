import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
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

export const addShop = async (shopData: Shop) => {
    try {
        const collectionRef = collection(db, "Tiendas")
        await setDoc(doc(collectionRef), shopData);

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}

export const deleteShop = async (itemId: string) => {
    try {
        await deleteDoc(doc(db, "Tiendas",itemId));

        return true;
    } catch (error) {
        console.error("Error al eliminar el documento: ", error);
        return false;
    }
}