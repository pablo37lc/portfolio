import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import Divided from "../components/Dividend";
import Stock from "../components/Stock";
import StockFactory from "../components/StockFactory";

function Portfolio( {user} ) {
    const [stocks   , setStocks ] = useState([]);
    const [isNull   , setIsNull ] = useState(true);

    const getStocks = () => {
        const q = query (
            collection(dbService, "portfolio", `${user.uid}`, "stocks") ,
            orderBy("order", "asc") ,
        );

        onSnapshot( q, (snapshot) => {
            const stockArray = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStocks(stockArray);
            stockArray ? setIsNull(true) : setIsNull(false);
        });
    }

    useEffect(() => {
        getStocks();
    });

    return (
        <div className="container">
            <Divided user = {user}/>
            <div>
                <StockFactory user = {user} isNull = {isNull}/> 
            </div>
            <div style={{ marginTop: 30 }}>
                {stocks.map((stock) => (
                    <Stock key={stock.id} user = {user} stock = {stock}/>
                ))}
            </div>
        </div>
    )
}

export default Portfolio;