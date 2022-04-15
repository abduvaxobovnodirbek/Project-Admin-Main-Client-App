import moment from "moment";
import React, { useEffect, useState } from "react";
import { api, API_VERSION } from "../../api/api";
import { priceFormat } from "../../constans/PriceFormater";
import SkeletonLoader from "../loader/SkeletonLoader";
import "./assets/quarantine.css";

export default function Quarantine() {
  const [data , setData] = useState<any>([]);
  const [loading ,setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [end , setEnd] = useState(10);

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    api.get(`${API_VERSION}/karantin`, {
      params: {
        query: category
      }
    }).then(res => {
        if(mounted) {
          setLoading(false);
           setData(category === "all" ?
           //@ts-ignore
            res.courses.concat(res.speakers.concat(res.users)) :
            //@ts-ignore
            category === "speakers" ? res.speakers : category === "users" ? res.users :
            //@ts-ignore
            res.courses )
        }
    })
    return () => {
      mounted = false
    }
  }, [category]);
  console.log(data, "data");
  
  return (
    <div className="speaker-block">
    <div className="first-block-speaker qurantine">
      <div className="d-flex justify-content-around pl-4 pb-4">
        <span className={`${category === "all" && "active"}`} onClick={() => setCategory("all")}>Barchasi</span>
        <span className={`${category === "speakers" && "active"}`} onClick={() => setCategory("speakers")}>O’qituvchilar</span>
        <span className={`${category === "users" && "active"}`} onClick={() => setCategory("users")}>O’quvchilar</span>
        <span className={`${category === "courses" && "active"}`} onClick={() => setCategory("courses")}>Kurslar</span>
      </div>
    </div>
    <div className="second-block-speaker">
      <table className="pl-5">
        <thead>
          <tr>
            <th style={{width: "10%"}}>Ism va tel.raqam</th>
            <th>Status</th>
            <th>Sabab</th>
          </tr>
        </thead>
        <tbody>
        {!loading && data?.slice(0, end).map((x: any) => (
            <tr key={x?.id}>
              <th
                  className="first-th-with-logo d-flex text-center align-items-center ml-2"
              >
                <img src={`https://backend.eduon.uz/${x?.image}`} alt="img" />
                <div className="pl-3 d-flex flex-column align-items-start" style={{paddingLeft: "20px"}}>
                  <p className="p-0 m-0">{x?.author_name || x?.name}</p>
                  <span>{x?.phone}</span>
                </div>
              </th>
              <th>{x?.type === "course" ? "Kurs" : x?.type === "speaker" ? "Spiker" : "O’quvchi"}</th>
              <th>{x?.reason_of_ban || "Nomalum"}</th>
            </tr>
        ))}
       {loading && 
       <>
        <tr>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
        </tr>
         <tr>
         <th><SkeletonLoader /></th>
         <th><SkeletonLoader /></th>
         <th><SkeletonLoader /></th>
       </tr>
        <tr>
        <th><SkeletonLoader /></th>
        <th><SkeletonLoader /></th>
        <th><SkeletonLoader /></th>
      </tr>
      </>
        }
        </tbody>
      </table>
      {!loading && data?.length > 0 && <div className={`show-more-btn`}>
                  <button onClick={() => setEnd(prev => prev + 10)}>Yana ko'rish</button>
              </div>}
    </div>
  </div>
  );
}
