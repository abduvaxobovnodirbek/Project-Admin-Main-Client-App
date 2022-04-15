import React, { useCallback, useEffect, useState } from "react";
import "./assets/setting.css";
import editIcon from "../../images/Edit.svg";
import { api, API_VERSION } from "../../api/api";
import { toast } from "react-toastify";
import { priceFormat } from "../../constans/PriceFormater";
import SkeletonLoader from "../loader/SkeletonLoader";

export default function Settings() {
  const [percentSpeaker, setPercentSpeakr] = useState("");
  const [percentEditSpeaker, setPercentEditSpeakr] = useState("");
  const [vaucherSpeaker, setVaucherPercentSpeakr] = useState("");
  const [vaucherEditSpeaker, setVaucherEditPercentSpeakr] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountEdit, setDiscountEdit] = useState("");
  const [courseName, setCourseName] = useState("");
  const [userName, setUserName] = useState("");
  const [coursesShow, setCoursesShow]= useState([]);
  const [userNameShow, setUserNameShow]= useState([]);
  const [loading ,setLoading]= useState(false);
  const [courseNameFromApi, setCourseNameFromApi] = useState<any>(null);
  const [userNameFromApi, setuserNameFromApi] = useState<any>(null)
  const [type, setType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalShow, setOpenModalaShow] = useState("");
  const [openModalShow1, setOpenModalaShow1] = useState("");
  const [bonus ,setBonus] = useState<any>("");
  const [bonus1 ,setBonus1] = useState<any>("");

  const editPecentSpeaker = useCallback(() => {
    let formData = new FormData();
    formData.append("eduon", percentEditSpeaker)
    let formData1 = new FormData();
    formData1.append("summa", vaucherEditSpeaker);
    let formData3 = new FormData();
    formData3.append("summa", discountEdit);
      if(type === "sp") {
        api.post(`${API_VERSION}/update-contract`, formData).then(res => {
          toast.success("Muaffaqiyaptli ozgartirildi", {
            position: toast.POSITION.TOP_RIGHT
        });
        setOpenModal(false);
            //@ts-ignore
        api.get(`${API_VERSION}/update-contract`).then(res => setPercentSpeakr(res.eduon))
        })
      }
      if(type === "vauch") {
        api.post(`${API_VERSION}/update-reg-bonus`, formData1).then(res => {
          toast.success("Muaffaqiyaptli ozgartirildi", {
            position: toast.POSITION.TOP_RIGHT
        });
        setOpenModal(false);
             //@ts-ignore
       api.get(`${API_VERSION}/update-reg-bonus`).then(res => setVaucherPercentSpeakr(res.summa));
        })
      }
      // if(type === "dis") {
      //   api.post(`${API_VERSION}/update-reg-bonus`, formData3).then(res => {
      //     toast.success("Muaffaqiyaptli ozgartirildi", {
      //       position: toast.POSITION.TOP_RIGHT
      //   });
      //   })
      // }
  }, [percentEditSpeaker,vaucherEditSpeaker, discountEdit, type]);

  const getDisCourse = useCallback(() => {
    if(courseNameFromApi > 0 && bonus.length > 0){
      const formData = new FormData();
      formData.append("course", courseNameFromApi);
      formData.append("discount", bonus);
      api.post(`${API_VERSION}/set-discount`, formData).then(res => {
        toast.success("Kursga muaffaqiyaptli chegirma berildi", {
          position: toast.POSITION.TOP_RIGHT
      });
      })
    }else {
      toast.error("Barcha maydonlar to'ldirilishi shart", {
        position: toast.POSITION.TOP_RIGHT
    })
    }
   
  }, [courseNameFromApi, bonus]);
  console.log(courseNameFromApi > 0, "sds");
  console.log(bonus.length > 0, "sdsds");
  
  
  const getUserDis = useCallback(() => {
   if(userNameFromApi > 0 && bonus1.length > 0){
    const formData = new FormData();
    formData.append("user_id", userNameFromApi);
    formData.append("bonus", bonus1);
    api.post(`${API_VERSION}/give-bonus`, formData).then(res => {
      toast.success("Foydalanuvchiga muaffaqiyaptli vaucher berildi", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
   } else {
    toast.error("Barcha maydonlar to'ldirilishi shart", {
      position: toast.POSITION.TOP_RIGHT
  })
   }
  }, [userNameFromApi, bonus1]);

  useEffect(() => {
    //@ts-ignore
    api.get(`${API_VERSION}/update-contract`).then(res => setPercentSpeakr(res.eduon))
     //@ts-ignore
    api.get(`${API_VERSION}/update-reg-bonus`).then(res => setVaucherPercentSpeakr(res.summa));
  }, [])
  useEffect(() => {
    if(courseName.length > 0){
      setLoading(true);
      api.get("api-web/get-course-search/", {
      params: {
        q: courseName
      }
    }).then(res => {
      //@ts-ignore
      setCoursesShow(res.data_courses);
      setLoading(false);
    })
  }
  }, [courseName])
  
  useEffect(() => {
    if(userName.length > 0){
      setLoading(true);
      api.get(`${API_VERSION}/search-user`, {
      params: {
        q: userName
      }
    }).then(res => {
      //@ts-ignore
      setUserNameShow(res.data_courses);
      setLoading(false);
    })
  }
  }, [userName])
  
  return (
    <div className="settings-block">
      <div className="d-flex justify-content-between flex-wrap p-3 first-block-setting">
        <div className="d-flex justify-content-around text-center align-items-center header-btn-setting mb-3 ml-1 p-3">
          <div className="text-div">
            <p>{percentSpeaker}%</p>
            <span>Spikerlar ulushi</span>
          </div>
          <div className="img-div" onClick={() =>{ setOpenModal(true); setType("sp")}}>
            <img src={editIcon} alt="" />
          </div>
        </div>
        <div className="d-flex justify-content-around text-center align-items-center  header-btn-setting mb-3 ml-1 p-3">
          <div className="text-div">
            <p>
              {priceFormat(vaucherSpeaker)} <span className="price-span">so’m</span>
            </p>
            <span>R. o’tish vaucheri</span>
          </div>
          <div className="img-div" onClick={() => {setOpenModal(true); setType("vauch")}}>
            <img src={editIcon} alt="" />
          </div>
        </div>
        <div className="d-flex justify-content-around text-center align-items-center  header-btn-setting mb-3 ml-1 p-3">
          <div className="text-div">
            <p>50%</p>
            <span>Kurslar chegirmasi</span>
          </div>
          <div className="img-div" onClick={() => {setOpenModal(true); setType("dis")}}>
            <img src={editIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="second-block-setting pt-3">
        <div className="ml-4 mb-3 second-btn-div">
          <p className="ml-1 mb-4">Kursga chegirma</p>
          <div className="d-flex text-center align-items-center justify-content-between">
            <input type="text" placeholder="Kursni kiriting" value={courseName} 
            onChange={e => {setCourseName(e.target.value); setOpenModalaShow(e.target.value)}}/>
            <div className="first-btn-2">
              <input type="text" placeholder="Miqdorini kiriting" onChange={(e) => setBonus(e.target.value)}/>
            </div>
            <div className="second-btn" onClick={getDisCourse}>
              <span>Tasdiqlash</span>
            </div>
          </div>
        </div>
        <div className={`result-search ${openModalShow.length > 0 && coursesShow && "open-search"}`}>
          <div className="body-open-search">
            {!loading && coursesShow?.map((x: any) => (
              <p onClick={() => { setCourseNameFromApi(x.id); setCourseName(x.name); setOpenModalaShow("")}}>{x.name}</p>
            ))
              }
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
          </div>
        </div>
        <div className="ml-4 mb-3 second-btn-div">
          <p className="ml-1 mb-4">Vaucher berish</p>
          <div className="d-flex text-center align-items-center justify-content-between">
            <input type="text" placeholder="Ismni kiriting" value={userName}
            onChange={(e) => {setUserName(e.target.value); setOpenModalaShow1(e.target.value)}}/>
            <div className="first-btn-2">
             <input type="text" placeholder="Miqdorini kiriting" onChange={(e) => setBonus1(e.target.value)}/>
            </div>
            <div className="second-btn" onClick={getUserDis}>
              <span>Tasdiqlash</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`result-search ${openModalShow1.length > 0 && userNameShow && "open-search"}`}>
          <div className="body-open-search">
            {!loading && userNameShow?.map((x: any) => (
              <p 
              onClick={() => { setuserNameFromApi(x.id); setUserName(`${x.first_name} ${x.last_name}`); setOpenModalaShow1("")}}>
                {`${x.first_name} ${x.last_name}`}
              </p>
            ))
              }
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
              {loading && <p><SkeletonLoader heigthLoader={"30px"}/></p>}
          </div>
        </div>
      <div className={`modal-add setting-modal ${openModal && "open"}`}>
             <div className="modal-body">
                 <div className="content-modal">
                 <div>
                     <p>{`${type === "sp" ? "Spikerlar ulushini kiriting (foizda)"
                      : type === "top" ? "Top spikerlar ulushini kiriting (foizda)" 
                      : type === "vauch" ? "R. o’tish vaucherini kiring" : 
                       type === "dis" ? "Kurslar chegirmasini kiring (foizda)":
                        "Referal ulushini kiriting"}`}</p>
                     <input onChange={e => {(type === "sp" ? setPercentEditSpeakr : type === "vauch" ?
                       setVaucherEditPercentSpeakr : setDiscountEdit)(e.target.value)}} />
                 </div>
                 <div className="d-flex justify-content-around btn-div-modal mt-5">
                     <button onClick={() => {setOpenModal(false); setType("")}}>Bekor qilish</button>
                     <button onClick={editPecentSpeaker}>Qo’shish</button>
                 </div>
                 </div> 
             </div>
         </div>
    
    </div>
  );
}
