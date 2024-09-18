import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { dbService } from "../firebase";

function StockFactory( {user, isNull} ) {
    
    const [creating , setCreating   ] = useState(isNull);

    const [ticker   , setTicker ] = useState("");
    const [value    , setValue  ] = useState(0);
    const [amount   , setAmount ] = useState(0);
    
    const onSubmit = async (event) => {
        event.preventDefault();

        await setDoc( doc( dbService, "portfolio", `${user.uid}`, "stocks", ticker), {
            value,
            amount,
            order: 0,
        });

        setCreating(false);

    };

    const onChangeTicker = (event) => {
        const {target:{value}} = event;
        setTicker(value.toUpperCase());
    }

    const onChangeValue = (event) => {
        const {target:{value}} = event;
        setValue(value);
    }

    const onChangeAmount = (event) => {
        const {target:{value}} = event;
        setAmount(value);
    }

    function toggleCreating() {
        setCreating((prev) => !prev);
    };

    return(
        <div>
            {creating ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            value={ticker}
                            onChange={onChangeTicker}
                            type="text"
                            placeholder="Ticker"
                        />
                        <input
                            value={value}
                            onChange={onChangeValue}
                            type="number"
                            step="0.01"
                            placeholder="Ticker"
                        />
                        <input
                            value={amount}
                            onChange={onChangeAmount}
                            type="number"
                            step="0.0001"
                            placeholder="Ticker"
                        />
                        <input
                            type="submit"
                            value="&rarr;"
                        />
                    </form>
                    <span onClick={toggleCreating}>
                        discard this card
                    </span>
                </>
            ) : (
                <span onClick={toggleCreating}>
                    주식을 추가하세요.
                </span>
            )}
        </div>
    );
};

export default StockFactory;