import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import video_icon from './assets/video.svg'
import up_icon from './assets/up.svg'
import down_icon from './assets/down.svg' 
import VideoPlayer from "./VIdeoPlayer";
import star from "./assets/star.png";
import Fill from "./assets/Fill4.svg";
import { api, API_VERSION } from "../../api/api";
import { toast } from "react-toastify";


export default function CoursesId () {
    const [ModuleTheme, setModuleTheme] = useState(true);
    const [videoUrl, setVideoUrl] = useState("");
    const [boughtCourse, setBoughtCourse] = useState<any>([]);
    const urlId = window.location.href.split('/');
        
    // const openMOduleClick = useMemo(() => setModuleTheme(prev => !prev), [ModuleTheme])
    const sendToQuarantine = useCallback(() => {
        api.get(`${API_VERSION}/course-karantin/${urlId[4]}`).then(res => {
            if(res) {
                toast.success("Kurs karatinga yuborildi", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })
    }, [])
    
    useEffect(() => {
        let mounted = true;
        api.get(`${API_VERSION}/course-detail/${urlId[4]}`).then(res => {
            if(mounted){
            //@ts-ignore
            setBoughtCourse(res.course_details)
            //@ts-ignore
            setVideoUrl(res?.course_details?.upload_or_youtube === "Youtube" ? 
            //@ts-ignore
            res?.course_details?.videos[0]?.url : 
            //@ts-ignore
            res?.course_details?.videos[0]?.video)
            }
        })
        return () => {
            mounted = false;
        }
    }, [])
    
    return (
        <div className="courses-id-wrapper">
            <div className="main-block-courses">
                <div className="left-block-courses">
                     <div className="UserAdmin_id_left_video course-player">
                        <VideoPlayer data={boughtCourse && boughtCourse?.videos}
                                     type={boughtCourse && boughtCourse?.upload_or_youtube}
                                     videoUrl={videoUrl}/>
                    </div>
                    <div className="text-content-video">
                        <h1>{boughtCourse?.name}</h1>
                        <p>{boughtCourse?.description}</p>
                        <div className="img-block-course">
                            <div className="title-block-course"><span>Avtor:</span> <p>{boughtCourse?.author?.full_name}</p></div>
                            <div className="icons-block-courses">
                                <span><img src={video_icon} alt="" />{boughtCourse?.videos?.length} ta</span>
                                <span><img src={star} alt="" />{boughtCourse?.course_rank?.rank} ({boughtCourse?.course_rank?.count})</span>
                                <span><img src={video_icon} alt="" />{boughtCourse?.sell_count} ta</span>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-div">
                        <div className="UserAdmin_id_right_content">
                           <h3>Kurs tarkibi</h3>
                           <p>{boughtCourse && boughtCourse?.videos?.length} ta video</p>
                        </div>
                        <div className="UserAdmin_id_right_moduleTheme">
                          <p>
                        <span onClick={()=> setModuleTheme(prevState => !prevState)}>
                            Modul 1 - {boughtCourse?.name}
                        {
                        ModuleTheme ?
                            <img src={up_icon} alt="" />
                            :
                            <img src={down_icon} alt="" />
                        }
                        </span>
                            {
                            ModuleTheme ?
                            <div>
                              {boughtCourse && boughtCourse?.videos?.map((x: any, index: any) => (
                                  <p onClick={() => {
                                      x?.url !== "" ? setVideoUrl(x?.url) : setVideoUrl(x?.video)
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                  }
                                     className={`${x?.url !== "" ? (videoUrl === x?.url ? "active" : "") : x.video !== "" ? (videoUrl === x?.video ? "active" : ""): "" }`}>
                                      <img src={video_icon} alt="" />
                                      {index + 1}. {x.title}
                                  </p>
                              )) }
                            </div>
                            :
                            null 
                        }
                    </p>
        
                        </div>
                        <div className="ban-block-course">
                            <p>Karantinga yuborish</p>
                            <textarea placeholder="Sababini yozing..."/>
                            <div><button onClick={sendToQuarantine}>Tasdiqlash</button></div>
                        </div>
                    </div>
                    {boughtCourse?.forwhoms?.length > 0 &&
                     <section className="section-forwho mt-2">
                                <div className="section_inner">
                                        <h2 className="section-title">Kurs kimlar uchun?</h2>
                                        {boughtCourse?.forwhoms.map((x: any) => (
                                            <div className="section-icon-text">
                                                <img src={Fill}/>
                                                <p>{x.title}</p>
                                            </div>
                                        ))}
                                </div>
                        </section>
                        }
                        {boughtCourse?.whatyoulearns?.length > 0 &&
                         <section className="section-forwho mt-4">
                                 <div className="section_inner">
                                     <h4 className="section-title">Kursdan nima olasiz?</h4>
                                          {boughtCourse?.whatyoulearns.map((x: any) => (
                                            <div className="section-icon-text">
                                                    <img src={Fill}/>
                                                    <p>{x.title}
                                                    </p>
                                            </div>
                                ))}
                                </div>
                         </section>
                         }
                </div>
                <div className="right-block-courses">
                        <div className="UserAdmin_id_right_content">
                           <h3>Kurs tarkibi</h3>
                           <p>{boughtCourse && boughtCourse?.videos?.length} ta video</p>
                        </div>
                        <div className="UserAdmin_id_right_moduleTheme">
                          <p>
                        <span onClick={()=> setModuleTheme(prevState => !prevState)}>
                            Modul 1 - {boughtCourse?.name}
                        {
                        ModuleTheme ?
                            <img src={up_icon} alt="" />
                            :
                            <img src={down_icon} alt="" />
                        }
                        </span>
                            {
                            ModuleTheme ?
                            <div>
                              {boughtCourse && boughtCourse?.videos?.map((x: any, index: any) => (
                                  <p onClick={() => {
                                      x?.url !== "" ? setVideoUrl(x?.url) : setVideoUrl(x?.video)
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                  }
                                     className={`${x?.url !== "" ? (videoUrl === x?.url ? "active" : "") : x.video !== "" ? (videoUrl === x?.video ? "active" : ""): "" }`}>
                                      <img src={video_icon} alt="" />
                                      {index + 1}. {x.title}
                                  </p>
                              )) }
                            </div>
                            :
                            null 
                        }
                    </p>
        
                        </div>
                        <div className="ban-block-course">
                            <p>Karantinga yuborish</p>
                            <textarea placeholder="Sababini yozing..."/>
                            <div><button onClick={sendToQuarantine}>Tasdiqlash</button></div>
                        </div>
                </div>
            </div>
        </div>
    )
}