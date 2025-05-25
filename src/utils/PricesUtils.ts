import { collection, doc, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase";

export interface ProductPrices {
    id: string;
    categoryName: string;
    currentPrices: object;
    productName: string;
}

export async function fetchPrices() {
    try {
        const querySnapshot = await getDocs(collection(db, "prices"));
        const docsList: ProductPrices[] = [];

        querySnapshot.forEach((doc) => {
            docsList.push({id: doc.id, ...doc.data() as Omit<ProductPrices, "id">});
        });
        
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }   
}

export async function saveProductPrice(productData: Omit<ProductPrices, "id"> ) {
    try {
            const collection_ref = collection(db, "prices")
            await setDoc(doc(collection_ref), productData);
    
            return true;
        } catch (error) {
            console.error("Error al obtener los documentos: ", error);
            return false;
        }
}