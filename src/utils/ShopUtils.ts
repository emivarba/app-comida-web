import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
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
        await setDoc(doc(db, "Tiendas", shopData.id), shopData as Omit<Shop, "id">);

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}

export async function updateShop(shopId: string, updatedData: Partial<Omit<Shop, "id">>) {
    try {
        const shopRef = doc(db, "Tiendas", shopId);
        await updateDoc(shopRef, updatedData);
    
        return true;
      } catch (error) {
        console.error("Error al actualizar la tienda: ", error);
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