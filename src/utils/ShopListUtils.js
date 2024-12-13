import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";

export const fetchShopListItems = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "item-shop-list"));
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

export const addListItem = async (item_data) => {
    try {
        const collection_ref = collection(db, "item-shop-list")
        await setDoc(doc(collection_ref), item_data);

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}