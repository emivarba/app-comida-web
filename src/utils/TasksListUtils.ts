import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";

export interface taskInfo {
    id: string,
    action: string,
}

export const fetchTasks = async (): Promise<taskInfo[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "Tareas"));
        const docsList: taskInfo[] = [];
        querySnapshot.forEach((doc) => {
            docsList.push({ id: doc.id, action: doc.data().action });
        });
        return docsList;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return []
    }
}

export const addTask = async (task_data: string) => {
    try {
        const collection_ref = collection(db, "Tareas")
        await setDoc(doc(collection_ref), {action: task_data});

        return true;
    } catch (error) {
        console.error("Error al obtener los documentos: ", error);
        return false;
    }
}

export const deleteTask = async (item_id: string) => {
    try {
        await deleteDoc(doc(db, "Tareas",item_id));

        return true;
    } catch (error) {
        console.error("Error al eliminar el documento: ", error);
        return false;
    }
}