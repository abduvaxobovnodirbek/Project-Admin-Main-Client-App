import React from "react";
import ReceiveIcon from "../../images/kirim.svg";
import SendIcon from "../../images/chiqim.svg";
import "./assets/economicsTable.css";
import moment from "moment";
import {priceFormat} from "../../constans/PriceFormater";


interface Props {
    readonly send: boolean;
    readonly data: any;
    readonly category: string;
}

function EconomicsTable({send, data, category}: Props) {
    return (
        <div className="table-econom mb-2 d-flex justify-content-between text-center align-items-center ml-3"
             key={data.id}>
            <img src={!send ? SendIcon : ReceiveIcon} alt=""/>
            <h1 className="name-user">{`${data?.user?.first_name} ${data?.user?.last_name}`}</h1>
            <h1>{moment(data?.date).format("DD.MM.YYYY - HH:MM")}</h1>
            <h1>{category === "payforbalances" ? priceFormat(data?.amount) : priceFormat(data?.summa || data?.amount)} so’m</h1>
            {(category === "speakers") && (data?.sp_summa ? <h1>{priceFormat(data.sp_summa)} so'm</h1> : <h1>--------</h1>)}
            {(category === "speakers") && (data?.for_eduon ? <h1>{priceFormat(data.for_eduon)} so'm </h1> : <h1>--------</h1>)}
            <h1>{data.type === "orders" ? "Kurs sotib olindi" : data.type === "transaction" ? "Pul yechib olindi" : "Hisob to'ldirildi"}</h1>
        </div>
    );
}

export default EconomicsTable;
