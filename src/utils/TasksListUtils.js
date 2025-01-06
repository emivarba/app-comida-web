import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";

export const fetchTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Tareas"));
        const docsList = [];
        querySnapshot.forEach((doc) => {
            docsList.push({ id: doc.id, ...doc.data() });
        });
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }
}

export const addTask = async (task_data) => {
    try {
        const collection_ref = collection(db, "Tareas")
        await setDoc(doc(collection_ref), {action: task_data});

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}

export const deleteTask = async (item_id) => {
    try {
        await deleteDoc(doc(db, "Tareas",item_id));

        return true;
    } catch (error) {
        console.error("Error al eliminar el documento: ", error);
        return false;
    }
}