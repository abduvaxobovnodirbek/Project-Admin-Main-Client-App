import React, {useCallback, useEffect, useState} from "react";
import "./assets/accepts.css";
import {api} from "../../api/api";
import {Base_Url} from "../../constans/AppConstants";
import KursLogo from "../../images/IconKurs.png";
import PlayIcon from "../../images/playIcon.png";
import Play from "../../images/Polygon.png";
import { toast } from "react-toastify";
import VideoPlayerAccept from "./VideoPlayerAccept";
import { useHistory } from "react-router";


export default function Accepts() {
  const [data ,setData] = useState([]);
  const [nextData, setNextData] = useState("");
  const [loading, setLoading] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [courseVideo, setCourseVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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
  const courseConfirm = (id: number) => {
    api.get(`${Base_Url}/course-confirm/${id}`).then(res => {
      if(res) {
        toast.success("Kurs tasdiqlandi", {
          position: toast.POSITION.TOP_RIGHT
      });
      api.get(`${Base_Url}/unconfirmed-courses`).then(res => {
        //@ts-ignore
        setData(res.results)
      })
      }
    }).catch(() => toast.success("Hatolik keyinroq urinip koring", {
      position: toast.POSITION.TOP_RIGHT
  }))
  }

  const courseReject = (id: number) => {
    api.get(`${Base_Url}/course-ban/${id}`).then(res => {
      if(res) {
        toast.success("Kurs rad etildi", {
          position: toast.POSITION.TOP_RIGHT
      });
      api.get(`${Base_Url}/unconfirmed-courses`).then(res => {
        //@ts-ignore
        setData(res.results)
      })
      }
    }).catch(() => toast.success("Hatolik keyinroq urinip koring", {
      position: toast.POSITION.TOP_RIGHT
  }))
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(`${Base_Url}/unconfirmed-courses`).then(res => {
      if(mounted) {
        //@ts-ignore
        setData(res.results)
        //@ts-ignore
        setNextData(res.next)
        setLoading(false)
      }
    })
    return () => {
      mounted = false;
    }
  }, []);
  
  
  return (
    <div className="accept-block">
      {openVideo && <div className="video-payer-accept">
          <VideoPlayerAccept close={setOpenVideo} videoUrl={videoUrl}  video={courseVideo}/>
      </div>}
      <div className="w-100 d-flex justify-content-around flex-wrap text-center align-items-center">
        {data && data?.map((x: any)=> (
          <div className="table-accept mb-3">
          <div className="ml-4 table-accept-body">
            <div className="header-div mt-3 flex-column">
              <div className="img-block-main">
                <img src={KursLogo} alt="" />
                 <div onClick={() => {setOpenVideo(true);
                   x.trailer.url === null ? setVideoUrl(x?.trailer?.video) : setVideoUrl(x?.trailer?.url); 
                   setCourseVideo(x?.trailer)}}> 
                   <img src={Play} alt="" className="img-play"/>
                 </div>
              </div>
              <div className="pl-2" style={{cursor: "pointer"}} onClick={() => history.replace(`/accept/${x.id}`)}>
                <p className="text-break" style={{height: "45px"}}>{x.name.length > 80 ? x.name.substring(0, 79) + "..." : x.name}</p>
                <span>{x.author_name}</span>
                <div className="d-flex img-block-accept text-center align-items-center">
                  <img src={PlayIcon} alt="" />
                  <p>{x.videos_count}</p>
                </div>
              </div>
            </div>
            <div className="footer-div d-flex justify-content-around mt-3 mb-3">
              <button onClick={() => courseConfirm(x.id)}>Tasdiqlash</button>
              <button onClick={() => courseReject(x.id)}>Rad etish</button>
            </div>
          </div>
        </div>
        ))
        }
      </div>
      {!loading && <div className="show-more-btn">
                    <button onClick={getNextData}>Yana ko'rish</button>
          </div>}
    </div>
  );
}
