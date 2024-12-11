// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function ShoppingList() {
    const [items] = useState([
        { id: 1, name: "Milk", purchased: false },
        { id: 2, name: "Eggs", purchased: true },
    ]);

    return (
        <div>
            <h1>Shopping List</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} {item.purchased ? "✔️" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
