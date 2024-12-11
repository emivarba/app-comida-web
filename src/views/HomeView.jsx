import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {routes_home_page} from "../utils/RoutesHome.js";
import {useNavigate} from "react-router-dom";
import "../styles/HomeView.scss";


function HomeView(){
    const navigate = useNavigate();

    function goToPage(path){
        return () => {
            navigate(path)
        }
    }

    return (
        <Container>
            <h1>Inicio</h1>

            <div className="home-page-btns">
                {routes_home_page.map((item) => (
                    <Button
                        key={item.name}
                        variant="outlined"
                        onClick={goToPage(item.path)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>

        </Container>
    )
}

export default HomeView;