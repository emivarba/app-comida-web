import {Route, Routes} from "react-router-dom";
import ShoppingListView from "./views/ShoppingListView.tsx";
import Header from "./components/Header.tsx";
import HomeView from "./views/HomeView.tsx";
import {useEffect, useState} from "react";
import {fetchShops} from "./utils/ShopUtils.ts";
import {useDispatch} from "react-redux";
import {replaceShopList} from "./features/shops/shopsSlice.ts";
import Container from "@mui/material/Container";
import TasksList from "./views/TasksList.tsx";
import ShopsView from "./views/ShopsView.tsx";
import SudokuView from "./views/SudokuView.tsx";

function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchShops()
            .then(shops_array => {
                dispatch(replaceShopList(shops_array))
            })
            .finally(() => {
                setLoading(false);
            })
    }, [dispatch])

    if (loading) {
        return (
            <Container >
                <span>Cargando ...</span>
            </Container>
        );
    }

    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<HomeView />} ></Route>
                <Route path="/tiendas" element={<ShopsView />} ></Route>
                <Route path="/lista-compra" element={<ShoppingListView />} ></Route>
                <Route path="/tareas" element={<TasksList />} ></Route>
                <Route path="/sudoku" element={<SudokuView />} ></Route>
            </Routes>
        </div>
    );
}

export default App;
