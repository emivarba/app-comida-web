import { useEffect, useState } from "react";
import { fetchPrices, ProductPrices } from "../utils/PricesUtils";
import "../styles/ProductPrices/ProductPricesView.scss"
import ProductListItem from "../components/ProductPrices/ProductListItem";
import DialogAddProductPrices from "../components/ProductPrices/DialogAddProductPrices";

function ProductPricesView() {
    const [productsList, setProductsList] = useState<ProductPrices[]>([]);
    const [openDialog, setDialogIsOpen] = useState(false);

     useEffect(() => {
        fetchPrices()
            .then((result_list) => {
                setProductsList(result_list);
            })
    }, []);

    return(
        <>
        <div className="container">
            <div className="title-container">
                <h1>Lista de precios</h1>
                <button className="primary-button" onClick={() => setDialogIsOpen(true)}>Añadir</button>
            </div>
            
            <div className="product-list">
                {
                    productsList.map((product) => (
                        <ProductListItem
                            key={product.id}
                            product={product}
                        ></ProductListItem>
                    ))
                }
            </div>
        </div>
        <DialogAddProductPrices
            openDialog={openDialog}
            setOpen={setDialogIsOpen}
            reloadList={() => null}
        ></DialogAddProductPrices>
        </>
    )
}

export default ProductPricesView