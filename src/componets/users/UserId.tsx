import React, {useCallback, useEffect, useState} from "react";
import "./assets/userId.css";
import {api, API_VERSION} from "../../api/api";
import moment from "moment";
import { toast } from "react-toastify";
import ReceiveIcon from "../../images/kirim.svg";


function UserId() {
    const [data, setData] = useState<any>([]);
    const urlId = window.location.href.split('/');
    const [dateOfBan, setDateOfBan] = useState("");
    const [bonus, setBonus] = useState("");
    const [quarantine, setQuarantine] = useState("");

    const transactions = data?.orders?.concat(data?.transactions);
    
    const sendToBan = useCallback(() => {
        let formData = new FormData();
        formData.append("date_of_release", moment(dateOfBan).format("YYYY-MM-DD"));
        api.post(`${API_VERSION}/user-ban/${urlId[4]}`, formData).then(res => {
            if(res) {
                toast.success("Foydalanuvchiga ban berildi", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })
    }, [moment, dateOfBan]);

    const giveVaucher = useCallback(() => {
      let formData = new FormData();
      formData.append("bonus", bonus);
      api.post(`${API_VERSION}/user-bonus/${urlId[4]}`, formData).then(res => {
        if(res) {
            toast.success("Foydalanuvchi vaucher berildi", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
      })
    }, [bonus]);

    const sendToQuarantine = useCallback(() => {
      let formData = new FormData();
      formData.append("reason_of_ban", quarantine);
      api.post(`${API_VERSION}/user-karantin/${urlId[4]}`, formData).then(res => {
        if(res) {
            toast.success("Foydalanuvchi karatinga yuborildi", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
      })
    }, [quarantine]);
    
    useEffect(() => {
        let mounted = true;
        api.get(`${API_VERSION}/user-detail/${urlId[4]}`).then(res => {
            if (mounted) {
                setData(res);
            }
        })
    }, []);
    return (
        <div className="user-id-page pt-4">
            <div className="first-block-id d-flex justify-content-around align-items-center text-center">
                <img src={data?.user_details?.image} alt=""/>
                <div className="d-flex flex-column pt-1">
                    <input type="text" value={data && data?.user_details?.name?.split(" ")[0]}/>
                    <input type="text" value={data && data?.user_details?.name?.split(" ")[1]}/>
                </div>
                <div className="d-flex flex-column pt-1">
                    <input type="text" value={`+${data?.user_details?.phone}`}/>
                    <input type="text" value={data?.user_details?.email}/>
                </div>
            </div>
            <div className="first-block-id-mob  align-items-center text-center">
                <div className="img-block-mob">
                    <img src={data?.user_details?.image} alt=""/>
                </div>
                <div className="input-block-mob d-flex justify-content-center flex-column">
                    <div className="d-flex flex-column pt-1">
                        <input type="text" value={data && data?.user_details?.name?.split(" ")[0]}/>
                        <input type="text" value={data && data?.user_details?.name?.split(" ")[1]}/>
                    </div>
                    <div className="d-flex flex-column pt-1">
                        <input type="text" value={`+ ${data?.user_details?.phone}`}/>
                        <input type="text" value={data?.user_details?.email}/>
                    </div>
                </div>
            </div>
            <div className="second-block-user-id d-flex justify-content-around">
                <div className="pb-3 pt-4 d-flex flex-column">
                    <p>Ban berish</p>
                    <div className="red-btn">
                        <input type="date" placeholder="Kunni kiriting" onChange={e => setDateOfBan(e.target.value)}/>
                        <button className="ml-4" onClick={sendToBan}>Tasdiqlash</button>
                    </div>
                </div>
                <div className="pb-3 pt-4 d-flex flex-column">
                    <p>Vaucher berish</p>
                    <div>
                        <input type="text" placeholder="Summani kiriting" onChange={e => setBonus(e.target.value)}/>
                        <button className="ml-4" onClick={giveVaucher}>Tasdiqlash</button>
                    </div>
                </div>
            </div>
            <div className="third-block-user-id d-flex flex-column ">
                <div>
                    <p>Karantinga yuborish</p>
                    <textarea placeholder="Sababini yozing..." onChange={e => setQuarantine(e.target.value)}/>
                    <div className="btn-user-block">
                        <button onClick={sendToQuarantine}>Tasdiqlash</button>
                    </div>
                </div>
            </div>
            <div className="fourth-block-user-id ml-2">
                <div className="d-flex body-fourth-block-user text-center align-items-center">
                    <div className="d-flex text-center align-items-center">
                        <span>Kurslar: </span>
                        <p>{data?.user_details?.courses} ta</p>
                    </div>
                    <div className="d-flex text-center align-items-center">
                        <span>Pul o’tkazmalar soni:</span>
                        <p>{data?.user_details?.pay_for_balances} ta</p>
                    </div>
                </div>
            </div>
            <div className="fifth-block-user-id">
                <div className="body-fifth-block-user-id d-flex">
                    <div className="pb-2">
                        <div className="d-flex pt-4">
                            <span className="title-span">Umumiy to'ldirilgan pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.total_balance !== null ? data?.user_details?.total_balance : 0} so'm</p>
                        </div>
                        <div className="d-flex pt-4 ">
                            <span className="title-span">Ishlatilgan pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.used_money !== null ? data?.user_details?.used_money : 0} so'm</p>
                        </div>
                        <div className="d-flex pt-4 ">
                            <span className="title-span">Mavjud pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.cash !== null ? data?.user_details?.cash : 0} so'm</p>
                        </div>
                    </div>
                    <div className="pb-2">
                        <div className="d-flex  pt-4 ">
                            <span className="title-span">Umumiy vaucher:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.total_bonus !== null ? data?.user_details?.total_bonus : 0} so'm</p>
                        </div>
                        <div className="d-flex pt-4">
                            <span className="title-span">Ishlatilgan vaucher:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.used_bonus !== null ? data?.user_details?.used_bonus : 0} so’m</p>
                        </div>
                        <div className="d-flex pt-4">
                            <span className="title-span">Mavjud vaucher:</span>
                            <span className="opacity-0">3</span>
                            <p>{data?.user_details?.bonus !== null ? data?.user_details?.bonus : 0} so’m</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="six-block-user-id d-flex">
                <div className="mb-4">
                    <div className="d-flex flex-column align-items-start">
                        <p>Tug’ilgan sana</p>
                        <input type="text" value={data?.user_details?.age} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Mamlakat</p>
                        <input type="text" value={data?.user_details?.country.name} disabled/>
                    </div>
                </div>
                <div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Kasb/Hunar</p>
                        <input type="text" value={data?.user_details?.job} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Viloyat</p>
                        <input type="text" value={data?.user_details?.region} disabled/>
                    </div>
                </div>
            </div>
            <div className="last-block-id d-flex flex-column align-items-start">
                <p>Kirim chiqimlar</p>
               {data && transactions?.slice(0, 5).map((x: any) => (
                  <div className="last-block-stat d-flex justify-content-between mb-3">
                  <div className="pl-3">
                      <img src={ReceiveIcon} alt=""/>
                  </div>
                  <p>Ulug’bek N.</p>
                  <p>08.06.2021 - 21:23</p>
                  <p>2,000,000 so’m</p>
                  <p>Reklama uchun</p>
              </div> 
               )) }
            </div>
        </div>
    );
}

export default UserId;
