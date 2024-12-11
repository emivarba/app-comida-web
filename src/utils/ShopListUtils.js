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
    }
};

export const addListItem = async (item_data) => {
    try {
        const collection_ref = collection(db, "item-shop-list")
        const query_data = await setDoc(doc(collection_ref), item_data);

        console.log(query_data)

        return 'Correcto';
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
    }
}