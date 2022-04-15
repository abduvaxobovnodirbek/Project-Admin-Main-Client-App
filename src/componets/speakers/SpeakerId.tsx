import React, {useCallback, useEffect, useState} from "react";
import "./assets/speakerId.css";
import ReceiveIcon from "../../images/kirim.svg";
import {api, API_VERSION} from "../../api/api";
import moment from "moment";
import { toast } from "react-toastify";

export default function SpeakerId() {
    const [data, setData] = useState<any>([]);
    const [reasonOfQuarantine, setReasonOfQuarantine] = useState("");
    const [reasonOfBan, setReasonOfBan] = useState("");
    const [dateOfBan, setDateOfBan] = useState("");
    const [end, setEnd] = useState(5);
    const urlId = window.location.href.split('/');

    const transactions = data?.orders?.concat(data?.transactions);
    console.log(transactions, "r");

    const sendToQuarantine = useCallback(() => {
        const formData = new FormData();
        formData.append("reason_of_ban", reasonOfQuarantine);
        formData.append("date_of_release", moment().format("YYYY-MM-DD"));
        api.post(`${API_VERSION}/speaker-karantin/${urlId[4]}`, formData).then(res => {
            if(res) {
                toast.success("Spiker karatinga yuborildi", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })
    }, [reasonOfQuarantine, moment]);

    const sendToBan = useCallback(() => {
        api.get(`${API_VERSION}/speaker-ban/${urlId[4]}`, {
          params: {
            reason_of_ban: reasonOfBan,
            date_of_release:  moment(dateOfBan).format("YYYY-MM-DD")
          }
        }).then(res => {
            if(res) {
                toast.success("Spikerga ban berildi", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })
    }, [reasonOfBan, moment, dateOfBan]);

    useEffect(() => {
        let mounted = true;
        api.get(`${API_VERSION}/speaker-detail/${urlId[4]}`).then(res => {
            if (mounted) {
                //@ts-ignore
                setData(res)
            }
        });
        return () => {
            mounted = false;
        }
    }, []);
    return (
        <div className="speaker-id-page pt-4">
            <div className="first-block-id d-flex justify-content-around align-items-center text-center">
                <div>
                    <img src={data?.speaker_details?.image} alt=""/>
                </div>
                <div className="d-flex flex-column pt-1">
                    <input type="text" value={data && data?.speaker_details?.name?.split(" ")[0]}/>
                    <input type="text" value={data && data?.speaker_details?.name?.split(" ")[1]}/>
                </div>
                <div className="d-flex flex-column pt-1">
                    <input type="text" value={`+ ${data?.speaker_details?.phone}`}/>
                    <input type="text" value={data?.speaker_details?.email}/>
                </div>
            </div>
            <div className="first-block-id-mob  align-items-center text-center">
                <div className="img-block-mob">
                    <img src={data?.speaker_details?.image} alt=""/>
                </div>
                <div className="input-block-mob d-flex justify-content-center flex-column">
                    <div className="d-flex flex-column pt-1">
                        <input type="text" value={data && data?.speaker_details?.name?.split(" ")[0]}/>
                        <input type="text" value={data && data?.speaker_details?.name?.split(" ")[1]}/>
                    </div>
                    <div className="d-flex flex-column pt-1">
                        <input type="text" value={`+ ${data?.speaker_details?.phone}`}/>
                        <input type="text" value={data?.speaker_details?.email}/>
                    </div>
                </div>
            </div>
            <div className="second-block-id d-flex justify-content-around">
                <div className="pt-4">
                    <p>Karantinga yuborish</p>
                    <textarea className="big-input" placeholder="Sababini yozing..."
                              onChange={e => setReasonOfQuarantine(e.target.value)}/>
                    <div className="div-btn">
                        <button onClick={sendToQuarantine}>Tasdiqlash</button>
                    </div>
                </div>
                <div className="pt-4">
                    <p>Ban berish</p>
                    <input type="date" placeholder="Kunni kiriting"
                           className="input-1" onChange={(e) => setDateOfBan(e.target.value)}
                    />
                    <textarea placeholder="Sababini yozing..." className="input-2"
                              onChange={(e) => setReasonOfBan(e.target.value)}/>
                    <div className="div-btn">
                        <button onClick={sendToBan}>Tasdiqalsh</button>
                    </div>
                </div>
            </div>
            <div className="third-block-id">
                <div className="body-third-block d-flex w-50 justify-content-around">
                    <div className="d-flex pt-4 pb-2 justify-content-between third-div">
                        <span className="title-span"> Kurslar: </span>
                        <p> {data?.speaker_details?.courses?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ta</p>
                    </div>
                    <div className="d-flex pt-4 pb-2 justify-content-between third-div-2">
                        <span className="title-span">Sotilan kurslar:</span>
                        <p> {data?.speaker_details?.orders?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ta</p>
                    </div>
                    <div className="d-flex pt-4 pb-2 justify-content-between third-div-3">
                        <span className="title-span">O’quvchilar: </span>
                        <p> {(data?.speaker_details?.students?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} ta</p>
                    </div>
                </div>
            </div>
            <div className="fourth-block-id ">
                <div className="body-fourth-block d-flex justify-content-around">
                    <div className="pb-2">
                        <div className="d-flex pt-4">
                            <span className="title-span">Umumiy tushgan pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{(data?.speaker_details?.revenue !== null ? (data?.speaker_details?.revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0)} so’m</p>
                        </div>
                        <div className="d-flex pt-4 ">
                            <span className="title-span">Yechib olingan pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{(data?.speaker_details?.transactions !== null ? data?.speaker_details?.transactions?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0)} so’m</p>
                        </div>
                    </div>
                    <div className="pb-2">
                        <div className="d-flex  pt-4 ">
                            <span className="title-span">Saytdagi pul:</span>
                            <span className="opacity-0">3</span>
                            <p>{(data?.speaker_details?.cash !== null ? data?.speaker_details?.cash?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0)} so’m</p>
                        </div>
                        <div className="d-flex pt-4">
                            <span className="title-span">Vaucher:</span>
                            <span className="opacity-0">3</span>
                            <p>0 so’m</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="five-block-id ">
                <div className="d-flex w-50 pt-4 pb-2">
                    <span>Eduon foydasi:</span>
                    <span className="opacity-0">3</span>
                    <p> {(data?.speaker_details?.eduons_revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} so’m</p>
                </div>
            </div>
            <div className="six-block-id d-flex pb-3">
                <div className="">
                    <div className="d-flex flex-column align-items-start">
                        <p>Tug’ilgan sana</p>
                        <input type="text" value={data?.speaker_details?.both_date} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Mamlakat</p>
                        <input type="text" value={data?.speaker_details?.country} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Kompaniya</p>
                        <input type="text" value={data?.speaker_details?.compony} disabled/>
                    </div>
                </div>
                <div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Kasb/Hunar</p>
                        <input type="text" value={data?.speaker_details?.kasbi} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Viloyat</p>
                        <input type="text" value={`${data?.speaker_details?.city} shahri`} disabled/>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <p>Karta raqam</p>
                        <input type="text" value={data?.speaker_details?.card_number} disabled/>
                    </div>
                </div>
            </div>
            <div className="last-block-id d-flex flex-column align-items-start">
                <p>Kirim chiqimlar</p>
               {data && transactions?.slice(0, end).map((x: any) => (
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
            <button onClick={() => setEnd(prev => prev + 5)} className="button-more">
                   Yana ko'rish
               </button>
        </div>
    );
}
