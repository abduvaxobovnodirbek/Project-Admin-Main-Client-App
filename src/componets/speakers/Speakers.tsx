import React, {useCallback, useEffect, useMemo, useState} from "react";
import "./assets/speaker.css";
import { useHistory } from "react-router";
import {api, API_VERSION} from "../../api/api";
import { priceFormat } from "../../constans/PriceFormater";
import SkeletonLoader from "../loader/SkeletonLoader";

interface RatingProps {
  count: number;
  rank: number;
}

interface SpeakersProps {
  readonly both_date: string;
  readonly card_number: string;
  readonly cash: string | number;
  readonly city: string;
  readonly compony: string;
  readonly country: string;
  readonly courses: string | number;
  readonly eduons_revenue: string| number;
  readonly id: string | number;
  readonly image: string;
  readonly kasbi: string;
  readonly name: string;
  readonly phone: string;
  readonly rating : RatingProps;
  readonly revenue: string;
  readonly students: number;
  readonly transactions: string | number | null
}

export default function Speakers() {
  const [data ,setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [nextData, setNextData] = useState("");
  const history = useHistory();

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
    api.get(`${API_VERSION}/speakers-list`).then(res => {
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

  return (
    <div className="speaker-block">
      <div className="first-block-speaker">
        <div className="d-flex justify-content-around pl-4 pb-4">
          <span className="active">Barchasi</span>
          {/* <span>TOP</span> */}
        </div>
      </div>
      <div className="second-block-speaker">
        <table className="pl-5">
          <thead>
            <tr>
              <th >Ism va tel.raqam</th>
              <th>Kurslar soni</th>
              <th>O’quvchilar soni</th>
              <th>Reyting</th>
              <th>Daromadi</th>
            </tr>
          </thead>
          <tbody>
          {!loading && data?.map((x: SpeakersProps) => (
              <tr key={x.id}>
                <th
                    className="first-th-with-logo d-flex text-center align-items-center ml-2"
                    onClick={() => history.replace(`speaker/${x.id}`)}
                >
                  <img src={x.image} alt="" />
                  <div className="pl-3 d-flex flex-column align-items-start" style={{paddingLeft: "20px"}}>
                    <p className="p-0 m-0">{x.name}</p>
                    <span>{x.phone}</span>
                  </div>
                </th>
                <th>{x.courses} ta</th>
                <th>{x.students} ta</th>
                <th>{x.rating.rank}</th>
                <th>{x.revenue !== null ? priceFormat(x.revenue) : 0} so’m</th>
              </tr>
          ))}
         {loading && 
         <>
          <tr>
            <th><SkeletonLoader /></th>
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
           <th><SkeletonLoader /></th>
         </tr>
          <tr>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
          <th><SkeletonLoader /></th>
        </tr>
        </>
          }
          </tbody>
        </table>
        {!loading && <div className="show-more-btn">
                    <button onClick={getNextData}>Yana ko'rish</button>
                </div>}
      </div>
    </div>
  );
}
