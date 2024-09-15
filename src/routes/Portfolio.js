import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import Divided from "../components/Dividend";

function Portfolio( {user} ) {
    const [stocks       , setStocks     ] = useState([]);
    const [isNewStock   , setIsNewStock ] = useState(false);

    const getStocks = () => {
        const q = query (
            collection(dbService, "stock") ,
            orderBy("customOrd", "asc") 
        );

        onSnapshot( q, (snapshot) => {
            const stockArray = snapshot.docs.map( (doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStocks(stockArray);
        });
    }

    useEffect(() => {
        getStocks();    
    }, []);

    function onNewStockClick() {
        setIsNewStock(!isNewStock);
    }    

    return (
        <div className="container">
            <Divided></Divided>
            <div>
                {isNewStock?
                    <button onClick={onNewStockClick}>
                        주식을 입력하세요
                    </button>
                :
                    <button onClick={onNewStockClick}>
                        주식을 입력했어요
                    </button>
                }
                
            </div>
            <div style={{ marginTop: 30 }}>
                {stocks.map((stock) => (
                    <>
                        <div>
                            주식 카드보드 예정
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Portfolio;