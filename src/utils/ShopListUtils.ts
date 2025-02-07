import {collection, doc, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.js";

export interface ItemShopList {
    id: string,
    name: string,
    shop: string,
}

export const fetchShopListItems = async (): Promise<ItemShopList[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "item-shop-list"));
        const docsList: ItemShopList[] = [];

        querySnapshot.forEach((doc) => {
            docsList.push({ id: doc.id, ...(doc.data() as Omit<ItemShopList, "id">) });
        });
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }
};

export const addListItem = async (item_data: Omit<ItemShopList, "id">) => {
    try {
        const collection_ref = collection(db, "item-shop-list")
        await setDoc(doc(collection_ref), item_data);

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}

export const deleteListItem = async (item_id: string) => {
    try {
        await deleteDoc(doc(db, "item-shop-list",item_id));

        return true;
    } catch (error) {
        console.error("Error al eliminar el documento: ", error);
        return false;
    }
}