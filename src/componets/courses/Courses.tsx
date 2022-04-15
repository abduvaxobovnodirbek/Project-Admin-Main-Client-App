import React, {useCallback, useEffect, useState} from "react";
import "./assets/courses.css";
import {api, API_VERSION} from "../../api/api";
import {priceFormat} from "../../constans/PriceFormater";
import { useHistory } from "react-router";
import SkeletonLoader from "../loader/SkeletonLoader";

export default function Courses() {
  const [data, setData] = useState<any>([]);
  const history = useHistory();
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
    let mounted = true;
    setLoading(true);
    api.get(`${API_VERSION}/course-list`).then(res => {
      if(mounted) {
        //@ts-ignore
        setData(res.results)
        setLoading(false);
        //@ts-ignore
        setNextData(res.next)
      }
    }).catch(() => {
      setLoading(false);
    });
    return () => {
      mounted = false
    }
  }, []);
  return (
    <div className="courses-block">
      <table>
        <thead>
          <tr>
            <th>Video</th>
            <th>Kurs mavzusi</th>
            <th>Ko’rishlar</th>
            <th>Xaridlar</th>
            <th>Reyting</th>
          </tr>
        </thead>
        <tbody>
        {!loading && data?.map((x: any) => (
          <tr>
            <th onClick={() => history.replace(`/course/${x.id}`)} style={{cursor: "pointer"}}>
              <div className="cours_sec2_imgBlock ml-5">
                <div className="courses_section2_imgSHa">
                  <img className="cours_sec2_img2" src={x.image} alt="#" />
                </div>
                <img className="cours_sec2_img1" src={`https://backend.eduon.uz${x.author_image}`} alt="#" />
              </div>
            </th>
            <th>
              <div className="second-tr d-flex flex-column align-items-start justify-content-lg-start">
                <span>{x.name}</span>
                <p>{priceFormat(x.price)} so’m</p>
              </div>
            </th>
            <th>{priceFormat(x.view)} ta</th>
            <th>{priceFormat(x.sell_count)} ta</th>
            <th>{priceFormat(x.course_rank.rank)}</th>
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
  );
}
