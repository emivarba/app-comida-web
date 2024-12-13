import ListCollections from "./components/ColectionsList.jsx";
import './styles/main.scss';
import {Route, Routes} from "react-router-dom";
import ShoppingListView from "./views/ShoppingListView.jsx";
import Header from "./components/Header.jsx";
import HomeView from "./views/HomeView.jsx";
import {useEffect, useState} from "react";
import {fetchShops} from "./utils/ShopUtils.js";
import {useDispatch} from "react-redux";
import {replaceShopList} from "./features/shops/shopsSlice.js";
import Container from "@mui/material/Container";

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
                <Route path="/tiendas" element={<ListCollections />} ></Route>
                <Route path="/lista-compra" element={<ShoppingListView />} ></Route>
            </Routes>

        </div>
    );
}

export default App;
