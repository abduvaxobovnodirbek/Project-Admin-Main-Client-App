import React, {useCallback, useEffect, useState} from "react";
import "./assets/user.css";
import { useHistory } from "react-router";
import {api, API_VERSION} from "../../api/api";
import {priceFormat} from "../../constans/PriceFormater";
import SkeletonLoader from "../loader/SkeletonLoader";


export default function Users() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [nextData, setNextData] = useState("");

  const getNextData = useCallback(() => {
    api.get(`${nextData}`).then(res => {
        //@ts-ignore
        setData(prev => [...prev, ...res.results]
        );
        //@ts-ignore
        setNextData(res.next)
    })
}, [nextData]);
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    api.get(`${API_VERSION}/users-list`).then(res => {
      if(mounted) {
        setLoading(false);
        //@ts-ignore
        setData(res.results)
        //@ts-ignore
        setNextData(res.next)
      }
    });
    return () => {
      mounted = false
    }
  }, []);
  const history = useHistory();
  return (
    <div className="users-block">
      <div className="mt-5">
        <table className="pl-5">
          <thead>
            <tr>
              <th>Ism va tel.raqam</th>
              <th>Pul miqdori</th>
              <th>Vaucher</th>
              <th>Kurslar</th>
            </tr>
          </thead>
          <tbody className="">
          {data?.map((x: any) => (
              <tr key={x.id}>
                <th
                    className="first-th-with-logo d-flex text-center align-items-center"
                    onClick={() => history.replace(`user/${x.id}`)}
                >
                  <img src={x.image} alt="" />
                  <div className="pl-3 d-flex flex-column align-items-start">
                    <p className="p-0 m-0">{x.name}</p>
                    <span>{x.phone}</span>
                  </div>
                </th>
                <th>{priceFormat(x.cash)} so'm</th>
                <th>{priceFormat(x.bonus)} so'm</th>
                <th>{priceFormat(x.courses)} ta</th>
              </tr>
          ))}
           {loading && 
         <>
          <tr>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
          </tr>
           <tr>
           <th><SkeletonLoader /></th>
           <th><SkeletonLoader /></th>
           <th><SkeletonLoader /></th>
           <th><SkeletonLoader /></th>
         </tr>
          <tr>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
        </tr>
        </>
          }
          </tbody>
        </table>
      </div>
      {!loading && <div className="show-more-btn">
                    <button onClick={getNextData}>Yana ko'rish</button>
                </div>}
    </div>
  );
}
