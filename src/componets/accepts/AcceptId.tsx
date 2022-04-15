import React, { useEffect, useState } from "react";
import VideoPlayerAccept from "./VideoPlayerAccept";
import KursLogo from "../../images/IconKurs.png";
import PlayIcon from "../../images/playIcon.png";
import Play from "../../images/Polygon.png";
import { api, API_VERSION } from "../../api/api";

export default function AcceptId() {
    const [data, setData] = useState([]);
    const [openVideo, setOpenVideo] = useState(false);
    const [courseVideo, setCourseVideo] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const urlId = window.location.href.split('/');

    useEffect(() => {
       api.get(`${API_VERSION}/course-detail/${urlId[4]}`).then(res => {
           //@ts-ignore
           setData(res?.course_details?.videos);
       })
    }, []);
    
    return (
        <div className="accept-block">
        {openVideo && <div className="video-payer-accept">
            <VideoPlayerAccept close={setOpenVideo} videoUrl={videoUrl}  video={courseVideo}/>
        </div>}
        <div className="w-100 d-flex flex-wrap text-center align-items-center">
          {data.length > 0 ? data?.map((x: any)=> (
            <div className="table-accept m-1">
            <div className="ml-4 table-accept-body">
              <div className="header-div mt-3 flex-column">
                <div className="img-block-main">
                  <img src={KursLogo} alt="" />
                   <div onClick={() => {setOpenVideo(true);
                     x?.url === null ? setVideoUrl(x?.video) : setVideoUrl(x?.url); 
                     setCourseVideo(x)}}> 
                     <img src={Play} alt="" className="img-play"/>
                   </div>
                </div>
                <div className="pl-2 mb-3" style={{cursor: "pointer"}}>
                  <p className="text-break" style={{height: "35px",  borderBottom: "none"}}>{x?.description?.length > 80 ? x?.description?.substring(0, 79) + "..." : x?.description}</p>
                </div>
              </div>
            </div>
          </div>
          )) : <h1>Videolar mavjud emas</h1>
          }
        </div>
      </div>
    )
}