import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

function Stock( {user, stock} ) {

    const today = new Date().toISOString().slice(0, 10);

    const [ticker, setTicker] = useState();

    const getTicker = () => {
        onSnapshot( doc(dbService, "ticker", `${stock.id}`), (doc) => {
            setTicker({id: doc.id, ...doc});
        });
    };

    useEffect(() => {   
        getTicker();
        if(ticker && today > ticker.date) {
            console.log("데이터 다시 받아오는 함수 입력하기");
        }
    });
    
    const onEdit = async(event) => {
        event.prevnetDefault();
        await updateDoc(stock, {});
    };
    
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure want to discard this card?");
        const stockDoc = doc(dbService, "portfolio", `${user.uid}`, "stocks", stock.id);
        if(ok) {
            await deleteDoc(stockDoc);
        }
    };

    return (
        <div className="stock">
            <form onSubmit={onEdit}>
                <label>
                    보여야 할 정보들
                    회사명 {stock.id},  
                    주가 {stock.value},  
                    보유량 {stock.amount},  
                    배당액
                </label>
                <span onClick={onDeleteClick}>
                    discard this card
                </span>
            </form>
        </div>
    )
}

export default Stock;