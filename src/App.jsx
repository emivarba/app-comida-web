import ListCollections from "./components/ColectionsList.jsx";
import './styles/main.scss';
import {Route, Routes} from "react-router-dom";
import ShoppingList from "./components/ShoppingList.jsx";
import Header from "./components/Header.jsx";
import HomeView from "./views/HomeView.jsx";

function App() {
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<HomeView />} ></Route>
                <Route path="/tiendas" element={<ListCollections />} ></Route>
                <Route path="/lista-compra" element={<ShoppingList />} ></Route>
            </Routes>

        </div>
    );
}

export default App;
