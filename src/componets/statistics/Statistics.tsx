import React, { useEffect, useState } from "react";
import "./assets/statistics.css";
import Users from "../../images/users.svg";
import Micro from "../../images/micro.png";
import Folder from "../../images/Folder.svg";
import Cash from "../../images/fourth.svg";
import { Circle, Line } from "rc-progress";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api, API_VERSION } from "../../api/api";
import {useShallowEqualSelector} from "../../constans/useShallowSelector";
import {roleSelector} from "../../reducers/authReducer";

const countries = require("../statistics/location-stats1.json");

interface CountriesProps {
  readonly percent: number;
  readonly country: string | number;
  readonly id: number;
}

export default function Statistics() {
  const [orderFilter, setOrderFilter] = useState("hafta");
  const [total, setTotal] = useState<any>([]);
  const [userStats, setUserStats] = useState<any>([]);
  const [studentYears, setStudentYears] = useState<any>("1");
  const [studentGender, setStudentGender] = useState<any>("man");
  const [coursesType, setCoursesType] = useState<any>("paid");
  const [countryStatistics, setCountryStatistics] = useState<any>([]);
  const [contendAndAud, setContentAndAud] = useState<any>([]);
  const [coursesInfo, setCoursesInfo] = useState<any>([]);
  const [coursesCategory, setCoursesCategory] = useState<any>([]);
  const [orderStat, setOrderStat] = useState<any>([]);
  useEffect(() => {
    let mounted = true;
    api.get(`${API_VERSION}/total-count`).then((res) => {
      if (mounted) {
        setTotal(res);
      }
    });
    api.get(`${API_VERSION}/user-statistics`).then((res) => {
      if (mounted) {
        setUserStats(res);
      }
    });
    api.get(`${API_VERSION}/content-and-auditory`).then((res) => {
      if (mounted) {
        setContentAndAud(res);
      }
    });
    api.get(`${API_VERSION}/free-and-paid-courses`).then((res) => {
      if (mounted) {
        setCoursesInfo(res);
      }
    });
    api.get(`${API_VERSION}/courses-by-categories`).then((res) => {
      if (mounted) {
        setCoursesCategory(res);
      }
    });
    api.get(`${API_VERSION}/country-statistics`).then((res) => {
      if (mounted) {
        setCountryStatistics(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    api
        .get(`${API_VERSION}/order-statistics`, {
          params: {
            query: orderFilter,
          },
        })
        .then((res) => {
          if (mounted) {
            setOrderStat(res);
          }
        });
    return () => {
      mounted = false;
    };
  }, [orderFilter]);

  const userUnknown =
    100 -
    (userStats?.age?.u1_17 +
      userStats?.age?.u18_23 +
      userStats?.age?.u24_29 +
      userStats?.age?.u30_35 +
      userStats?.age?.u36_45);

  const newDataArrAfterFilterAuditory = [
    {
      name: "Yanvar",
      kontent: 0,
      auditoriya: 0,
      amt: 2400,
    },
    {
      name: "Fevral",
      kontent: 0,
      auditoriya: 0,
      amt: 2210,
    },
    {
      name: "Mart",
      kontent: 0,
      auditoriya: 0,
      amt: 2290,
    },
    {
      name: "Aprel",
      kontent: 0,
      auditoriya: 0,
      amt: 2000,
    },
    {
      name: "May",
      content: 0,
      auditoriya: 0,
      amt: 2181,
    },
    {
      name: "Iyul",
      kontent: 0,
      auditoriya: 0,
      amt: 2500,
    },
    {
      name: "Avgust",
      kontent: 0,
      auditoriya: 0,
      amt: 2100,
    },
    {
      name: "Sentabr",
      kontent: 0,
      auditoriya: 0,
      amt: 2100,
    },
    {
      name: "Oktabr",
      kontent: 0,
      auditoriya: 0,
      amt: 2100,
    },
    {
      name: "Noyabr",
      kontent: 0,
      auditoriya: 0,
      amt: 2100,
    },
    {
      name: "Dekabr",
      kontent: 0,
      auditoriya: 0,
      amt: 2100,
    },
  ];
  contendAndAud?.content?.map((x: any) => {
    if (x.month === 1) {
      newDataArrAfterFilterAuditory[0].content = x.content;
    }
    if (x.month === 2) {
      newDataArrAfterFilterAuditory[1].content = x.content;
    }
    if (x.month === 3) {
      newDataArrAfterFilterAuditory[2].content = x.content;
    }
    if (x.month === 4) {
      newDataArrAfterFilterAuditory[3].content = x.content;
    }
    if (x.month === 5) {
      newDataArrAfterFilterAuditory[4].content = x.content;
    }
    if (x.month === 6) {
      newDataArrAfterFilterAuditory[5].content = x.content;
    }
    if (x.month === 7) {
      newDataArrAfterFilterAuditory[6].content = x.content;
    }
    if (x.month === 8) {
      newDataArrAfterFilterAuditory[7].content = x.content;
    }
    if (x.month === 9) {
      newDataArrAfterFilterAuditory[8].content = x.content;
    }
    if (x.month === 10) {
      newDataArrAfterFilterAuditory[9].content = x.content;
    }
    if (x.month === 11) {
      newDataArrAfterFilterAuditory[10].content = x.content;
    }
    if (x.month === 12) {
      newDataArrAfterFilterAuditory[11].content = x.content;
    }
  });
  contendAndAud?.auditory?.map((x: any) => {
    if (x.month === 1) {
      newDataArrAfterFilterAuditory[0].auditoriya = x.auditory;
    }
    if (x.month === 2) {
      newDataArrAfterFilterAuditory[1].auditoriya = x.auditory;
    }
    if (x.month === 3) {
      newDataArrAfterFilterAuditory[2].auditoriya = x.auditory;
    }
    if (x.month === 4) {
      newDataArrAfterFilterAuditory[3].auditoriya = x.auditory;
    }
    if (x.month === 5) {
      newDataArrAfterFilterAuditory[4].auditoriya = x.auditory;
    }
    if (x.month === 6) {
      newDataArrAfterFilterAuditory[5].auditoriya = x.auditory;
    }
    if (x.month === 7) {
      newDataArrAfterFilterAuditory[6].auditoriya = x.auditory;
    }
    if (x.month === 8) {
      newDataArrAfterFilterAuditory[7].auditoriya = x.auditory;
    }
    if (x.month === 9) {
      newDataArrAfterFilterAuditory[8].auditoriya = x.auditory;
    }
    if (x.month === 10) {
      newDataArrAfterFilterAuditory[9].auditoriya = x.auditory;
    }
    if (x.month === 11) {
      newDataArrAfterFilterAuditory[10].auditoriya = x.auditory;
    }
    if (x.month === 12) {
      newDataArrAfterFilterAuditory[11].auditoriya = x.auditory;
    }
  });

  const newSoldArrAfterFilterMonth = [
    { day: "1", Sotilgan: 0 },
    { day: "2", Sotilgan: 0 },
    { day: "3", Sotilgan: 0 },
    { day: "4", Sotilgan: 0 },
    { day: "5", Sotilgan: 0 },
    { day: "6", Sotilgan: 0 },
    { day: "7", Sotilgan: 0 },
    { day: "8", Sotilgan: 0 },
    { day: "9", Sotilgan: 0 },
    { day: "10", Sotilgan: 0 },
    { day: "11", Sotilgan: 0 },
    { day: "12", Sotilgan: 0 },
    { day: "13", Sotilgan: 0 },
    { day: "14", Sotilgan: 0 },
    { day: "15", Sotilgan: 0 },
    { day: "16", Sotilgan: 0 },
    { day: "17", Sotilgan: 0 },
    { day: "18", Sotilgan: 0 },
    { day: "19", Sotilgan: 0 },
    { day: "20", Sotilgan: 0 },
    { day: "21", Sotilgan: 0 },
    { day: "22", Sotilgan: 0 },
    { day: "23", Sotilgan: 0 },
    { day: "24", Sotilgan: 0 },
    { day: "25", Sotilgan: 0 },
    { day: "26", Sotilgan: 0 },
    { day: "27", Sotilgan: 0 },
    { day: "28", Sotilgan: 0 },
    { day: "29", Sotilgan: 0 },
    { day: "30", Sotilgan: 0 },
    { day: "31", Sotilgan: 0 },
  ];
  const newSoldArrAfterFilterWeek = [
    { day: "Dushanba", Sotilgan: 0 },
    { day: "Seshanba", Sotilgan: 0 },
    { day: "Chorshanba", Sotilgan: 0 },
    { day: "Payshanba", Sotilgan: 0 },
    { day: "Juma", Sotilgan: 0 },
    { day: "Shanba", Sotilgan: 0 },
    { day: "Yakshaba", Sotilgan: 0 },
  ];
  const newSoldArrAfterFilterYear = [
    { day: "Yanvar", Sotilgan: 0 },
    { day: "Fevral", Sotilgan: 0 },
    { day: "Mart", Sotilgan: 0 },
    { day: "Aprel", Sotilgan: 0 },
    { day: "May", Sotilgan: 0 },
    { day: "Iyun", Sotilgan: 0 },
    { day: "Iyul", Sotilgan: 0 },
    { day: "Avgust", Sotilgan: 0 },
    { day: "Sentabr", Sotilgan: 0 },
    { day: "Oktabr", Sotilgan: 0 },
    { day: "Noyabr", Sotilgan: 0 },
    { day: "Dekabr", Sotilgan: 0 },
  ];

  if (orderFilter === "hafta") {
    orderStat?.weekly_statistics?.map((x: any) => {
      if (x.day === 2) {
        newSoldArrAfterFilterWeek[0].Sotilgan = x.sells;
      }
      if (x.day === 3) {
        newSoldArrAfterFilterWeek[1].Sotilgan = x.sells;
      }
      if (x.day === 4) {
        newSoldArrAfterFilterWeek[2].Sotilgan = x.sells;
      }
      if (x.day === 5) {
        newSoldArrAfterFilterWeek[3].Sotilgan = x.sells;
      }
      if (x.day === 6) {
        newSoldArrAfterFilterWeek[4].Sotilgan = x.sells;
      }
      if (x.day === 7) {
        newSoldArrAfterFilterWeek[5].Sotilgan = x.sells;
      }
      if (x.day === "yakshanba") {
        newSoldArrAfterFilterWeek[6].Sotilgan = x.sells;
      }
    });
  }
  if (orderFilter === "oy") {
    orderStat?.monthly_statistics?.map((x: any) => {
      if (x.day === 1) {
        newSoldArrAfterFilterMonth[0].Sotilgan = x.sells;
      }
      if (x.day === 2) {
        newSoldArrAfterFilterMonth[1].Sotilgan = x.sells;
      }
      if (x.day === 3) {
        newSoldArrAfterFilterMonth[2].Sotilgan = x.sells;
      }
      if (x.day === 4) {
        newSoldArrAfterFilterMonth[3].Sotilgan = x.sells;
      }
      if (x.day === 5) {
        newSoldArrAfterFilterMonth[4].Sotilgan = x.sells;
      }
      if (x.day === 6) {
        newSoldArrAfterFilterMonth[5].Sotilgan = x.sells;
      }
      if (x.day === 7) {
        newSoldArrAfterFilterMonth[6].Sotilgan = x.sells;
      }
      if (x.day === 8) {
        newSoldArrAfterFilterMonth[7].Sotilgan = x.sells;
      }
      if (x.day === 9) {
        newSoldArrAfterFilterMonth[8].Sotilgan = x.sells;
      }
      if (x.day === 10) {
        newSoldArrAfterFilterMonth[9].Sotilgan = x.sells;
      }
      if (x.day === 11) {
        newSoldArrAfterFilterMonth[10].Sotilgan = x.sells;
      }
      if (x.day === 12) {
        newSoldArrAfterFilterMonth[11].Sotilgan = x.sells;
      }
      if (x.day === 13) {
        newSoldArrAfterFilterMonth[12].Sotilgan = x.sells;
      }
      if (x.day === 14) {
        newSoldArrAfterFilterMonth[13].Sotilgan = x.sells;
      }
      if (x.day === 15) {
        newSoldArrAfterFilterMonth[14].Sotilgan = x.sells;
      }
      if (x.day === 16) {
        newSoldArrAfterFilterMonth[15].Sotilgan = x.sells;
      }
      if (x.day === 17) {
        newSoldArrAfterFilterMonth[16].Sotilgan = x.sells;
      }
      if (x.day === 18) {
        newSoldArrAfterFilterMonth[17].Sotilgan = x.sells;
      }
      if (x.day === 19) {
        newSoldArrAfterFilterMonth[18].Sotilgan = x.sells;
      }
      if (x.day === 20) {
        newSoldArrAfterFilterMonth[19].Sotilgan = x.sells;
      }
      if (x.day === 21) {
        newSoldArrAfterFilterMonth[20].Sotilgan = x.sells;
      }
      if (x.day === 22) {
        newSoldArrAfterFilterMonth[21].Sotilgan = x.sells;
      }
      if (x.day === 23) {
        newSoldArrAfterFilterMonth[22].Sotilgan = x.sells;
      }
      if (x.day === 24) {
        newSoldArrAfterFilterMonth[23].Sotilgan = x.sells;
      }
      if (x.day === 25) {
        newSoldArrAfterFilterMonth[24].Sotilgan = x.sells;
      }
      if (x.day === 26) {
        newSoldArrAfterFilterMonth[25].Sotilgan = x.sells;
      }
      if (x.day === 27) {
        newSoldArrAfterFilterMonth[26].Sotilgan = x.sells;
      }
      if (x.day === 28) {
        newSoldArrAfterFilterMonth[27].Sotilgan = x.sells;
      }
      if (x.day === 29) {
        newSoldArrAfterFilterMonth[28].Sotilgan = x.sells;
      }
      if (x.day === 30) {
        newSoldArrAfterFilterMonth[29].Sotilgan = x.sells;
      }
      if (x.day === 31) {
        newSoldArrAfterFilterMonth[30].Sotilgan = x.sells;
      }
    });
  }
  if (orderFilter === "yil") {
    orderStat?.yearly_statistics?.map((x: any) => {
      if (x.month === 1) {
        newSoldArrAfterFilterYear[0].Sotilgan = x.sells;
      }
      if (x.month === 2) {
        newSoldArrAfterFilterYear[1].Sotilgan = x.sells;
      }
      if (x.month === 3) {
        newSoldArrAfterFilterYear[2].Sotilgan = x.sells;
      }
      if (x.month === 4) {
        newSoldArrAfterFilterYear[3].Sotilgan = x.sells;
      }
      if (x.month === 5) {
        newSoldArrAfterFilterYear[4].Sotilgan = x.sells;
      }
      if (x.month === 6) {
        newSoldArrAfterFilterYear[5].Sotilgan = x.sells;
      }
      if (x.month === 7) {
        newSoldArrAfterFilterYear[6].Sotilgan = x.sells;
      }
      if (x.month === 8) {
        newSoldArrAfterFilterYear[7].Sotilgan = x.sells;
      }
      if (x.month === 9) {
        newSoldArrAfterFilterYear[8].Sotilgan = x.sells;
      }
      if (x.month === 10) {
        newSoldArrAfterFilterYear[9].Sotilgan = x.sells;
      }
      if (x.month === 11) {
        newSoldArrAfterFilterYear[10].Sotilgan = x.sells;
      }
      if (x.month === 12) {
        newSoldArrAfterFilterYear[11].Sotilgan = x.sells;
      }
    });
  }
  const coursesCategoryArray = [
    coursesCategory?.Biznes > 0 && coursesCategory?.Biznes,
    coursesCategory?.["IT va Dasturlash"] > 0
      ? coursesCategory?.["IT va Dasturlash"]
      : 0,
    coursesCategory?.["Din va ma'rifat"] > 0
      ? coursesCategory?.["Din va ma'rifat"]
      : 0,
    coursesCategory?.["Foto va video"] > 0
      ? coursesCategory?.["Foto va video"]
      : 0,
    coursesCategory?.["San'at"] > 0 ? coursesCategory?.["San'at"] : 0,
    coursesCategory?.["Sog'lik va fitnes"] > 0
      ? coursesCategory?.["Sog'lik va fitnes"]
      : 0,
    coursesCategory?.["Shaxsiy o'sish"] > 0
      ? coursesCategory?.["Shaxsiy o'sish"]
      : 0,
    coursesCategory?.["Ta'lim va ilmiy fanlar"] > 0
      ? coursesCategory?.["Ta'lim va ilmiy fanlar"]
      : 0,
    coursesCategory?.["Tijorat huquqi"] > 0
      ? coursesCategory?.["Tijorat huquqi"]
      : 0,
    coursesCategory?.Marketing > 0 ? coursesCategory?.Marketing : 0,
  ];

  // const countryArray = [] as any;
  // // eslint-disable-next-line no-console
  // console.log(countryArray, "ar");

  // eslint-disable-next-line no-console
  // const countryValues =
  //   countryStatistics && Object?.entries(countryStatistics?.country_statistics);
  // countryStatistics &&
  //   // @ts-ignore
  //   countryValues.forEach(([key, value]) => {
  //     // eslint-disable-next-line no-console
  //     console.log(key, value)
  //     countryArray.push({ country: key, percent: value });
  //   });
  return (
    <div className="statistics-container">
      <div className="statistics-info-first">
        <div className="statistics-info-body d-flex justify-content-around text-center align-items-center">
          <div className="body-text">
            <p className="font-weight-bold ">{total?.speakers}</p>
            <span>Speakerlar</span>
          </div>
          <div className="body-img-1 d-flex align-items-center justify-content-center">
            <img src={Micro} alt="" />
          </div>
        </div>
        <div className="statistics-info-body  d-flex justify-content-around text-center align-items-center">
          <div className="body-text">
            <p className="font-weight-bold">{total?.users}</p>
            <span>Foydalanuvchilar</span>
          </div>
          <div className="body-img-2 d-flex align-items-center justify-content-center">
            <img src={Users} alt="" />
          </div>
        </div>
        <div className="statistics-info-body d-flex justify-content-around text-center align-items-center">
          <div className="body-text">
            <p className="font-weight-bold">{total?.courses}</p>
            <span>Kurslar soni</span>
          </div>
          <div className="body-img-3 d-flex align-items-center justify-content-center">
            <img src={Folder} alt="" />
          </div>
        </div>
        <div className="statistics-info-body d-flex justify-content-around text-center align-items-center">
          <div className="body-text d-flex flex-column">
            <p className="font-weight-bold">{total?.orders}</p>
            <span>Sotilgan kurslar</span>
          </div>
          <div className="body-img-4 d-flex align-items-center justify-content-center">
            <img src={Cash} alt="" />
          </div>
        </div>
      </div>
      <div className="statistics-info-second d-flex justify-content-around pt-5">
        <div className="cart-info">
          <div className="first-chart-body d-flex justify-content-between text-center align-items-center">
            <span className="pl-4">Kontent va auditoriya</span>
            <ul className="">
              <li>Auditoriya</li>
              <li>Kontent</li>
            </ul>
          </div>
          <ResponsiveContainer width="95%" height="85%">
            <BarChart
              width={750}
              height={280}
              data={newDataArrAfterFilterAuditory}
              stackOffset="sign"
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="kontent" stackId="a" fill="#E6E9F5" barSize={17} />
              <Bar dataKey="auditoriya" stackId="a" fill="#006AFF" barSize={17} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="students-years-info">
          <div className="d-flex justify-content-center text-center align-items-center flex-column pt-2">
            <p>O’quvchilar yoshi</p>
            <div className="w-50 h-75 position-relative">
              <Circle
                percent={[
                  userStats?.age?.u1_17,
                  userStats?.age?.u18_23,
                  userStats?.age?.u24_29,
                  userStats?.age?.u30_35,
                  userStats?.age?.u36_45,
                  userStats?.age?.u46p,
                  userUnknown,
                ]}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={[
                  "#006AFF",
                  "#F2C94C",
                  "#2D9CDB",
                  "#6FCF97",
                  "#F2994A",
                  "#E6E9F2",
                  // "#E6E9F2",
                ]}
              />
              <span className="percent-p-circle-1">
                {studentYears === "1"
                  ? Math.round(userStats?.age?.u1_17)
                  : studentYears === "2"
                  ? Math.round(userStats?.age?.u18_23)
                  : studentYears === "3"
                  ? Math.round(userStats?.age?.u24_29)
                  : studentYears === "4"
                  ? Math.round(userStats?.age?.u30_35)
                  : studentYears === "5"
                  ? Math.round(userStats?.age?.u36_45)
                  : Math.round(userUnknown)}
                %
              </span>
            </div>
            <ul className="list-years">
              <li className="li_1" onClick={() => setStudentYears("1")}>
                <span className="opacity-0">0</span>1-17
              </li>
              <li className="li_2" onClick={() => setStudentYears("2")}>
                18-23
              </li>
              <li className="li_3" onClick={() => setStudentYears("3")}>
                24-29
              </li>
              <li className="li_4" onClick={() => setStudentYears("4")}>
                30-35
              </li>
              <li className="li_5" onClick={() => setStudentYears("5")}>
                36-45
              </li>
              <li className="li_6" onClick={() => setStudentYears("6")}>
                46-unk
              </li>
              <li className="li_7 opacity-0 ">Unknown</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mobile-div-statistics  d-flex justify-content-around mt-3 mr-1">
        <div className="students-years-info">
          <div className="d-flex justify-content-center text-center align-items-center flex-column pt-2">
            <p>O’quvchilar yoshi</p>
            <div className="w-75 h-75 position-relative circle-stat">
              <Circle
                percent={[
                  userStats?.age?.u1_17,
                  userStats?.age?.u18_23,
                  userStats?.age?.u24_29,
                  userStats?.age?.u30_35,
                  userStats?.age?.u36_45,
                  userUnknown,
                ]}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={[
                  "#006AFF",
                  "#F2C94C",
                  "#2D9CDB",
                  "#6FCF97",
                  "#F2994A",
                  "#E6E9F2",
                ]}
              />
              <span className="percent-p-circle-1">
                {studentYears === "1"
                  ? Math.round(userStats?.age?.u1_17)
                  : studentYears === "2"
                  ? Math.round(userStats?.age?.u18_23)
                  : studentYears === "3"
                  ? Math.round(userStats?.age?.u24_29)
                  : studentYears === "4"
                  ? Math.round(userStats?.age?.u30_35)
                  : studentYears === "5"
                  ? Math.round(userStats?.age?.u36_45)
                  : Math.round(userUnknown)}
                  %
              </span>
            </div>
            <ul className="list-years">
              <li className="li_1" onClick={() => setStudentYears("1")}>
                <span className="opacity-0">0</span>1-17
              </li>
              <li className="li_2" onClick={() => setStudentYears("2")}>
                18-23
              </li>
              <li className="li_3" onClick={() => setStudentYears("3")}>
                24-29
              </li>
              <li className="li_4" onClick={() => setStudentYears("4")}>
                30-35
              </li>
              <li className="li_5" onClick={() => setStudentYears("5")}>
                36-45
              </li>
              <li className="li_6" onClick={() => setStudentYears("6")}>
                46-unk
              </li>
              <li className="li_7 opacity-0">Undefined</li>
            </ul>
          </div>
        </div>
        <div className="students-gender-info">
          <div className=" text-center align-items-center d-flex justify-content-center flex-column pt-2">
            <p>O’quvchilar jinsi</p>
            <div className="w-75 h-75 position-relative circle-stat">
              <Circle
                percent={[
                  userStats?.gender?.yigitlar,
                  userStats?.gender?.qizlar,
                ]}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={["#006AFF", "#E6E9F2"]}
              />
              <span className="percent-p-circle-1">
                {studentGender === "man"
                  ? Math.round(userStats?.gender?.yigitlar)
                  : Math.round(userStats?.gender?.qizlar)}
                %
              </span>
            </div>
            <ul className="ul-gender d-flex justify-content-around w-75 p-3 text-center align-items-center">
              <li
                className="gender-man"
                onClick={() => setStudentGender("man")}
              >
                Yigitlar
              </li>
              <li
                className="gender-women"
                onClick={() => setStudentGender("woman")}
              >
                Qizlar
              </li>
            </ul>
          </div>
        </div>
        <div className="category-statistics">
          <div className="d-flex justify-content-center text-center align-items-center flex-column pt-2">
            <p>Kurslar turkumi</p>
            <div className="w-75 h-75 position-relative circle-stat">
              <Circle
                percent={coursesCategoryArray}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={[
                  "#F2C94C",
                  "#F2C94C",
                  "#6FCF97",
                  "#006AFF",
                  "#a83a32",
                  "#a2a832",
                  "#32a842",
                  "#32a88c",
                  "#3271a8",
                  "#7732a8",
                ]}
              />
              <span className="percent-p-circle">75%</span>
            </div>
            <ul className="list-categories pt-2">
              <li className="li_1">Biznes</li>
              <li className="li_2">IT texno</li>
              <li className="li_3">Ma'rifat</li>
              <li className="li_4">Boshqalar</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="statistics-info-third d-flex justify-content-around pt-5">
        <div className="buy-course-info">
          <div className="d-flex justify-content-between w-100 pl-4 pr-5 mt-3 mb-3">
            <select name="" id="" className="list-statistics">
              <option value="">Sotilgan kurslar</option>
            </select>
            <select
              name=""
              id=""
              className="list-statistics1"
              onChange={(e) => setOrderFilter(e.target.value)}
            >
              <option value="hafta">Hafta</option>
              <option value="oy">Oy</option>
              <option value="yil">Yil</option>
              <option value="kecha">Kecha</option>
              <option value="bugun">Bugun</option>
            </select>
          </div>
          <ResponsiveContainer width="95%" height="80%">
            <AreaChart
              width={400}
              height={130}
              data={
                orderFilter === "bugun"
                  ? orderStat.today_statistics
                  : orderFilter === "kecha"
                  ? orderStat.yesterday_statistics
                  : orderFilter === "hafta"
                  ? newSoldArrAfterFilterWeek
                  : orderFilter === "oy"
                  ? newSoldArrAfterFilterMonth
                  : orderFilter === "yil"
                  ? newSoldArrAfterFilterYear
                  : null
              }
              margin={{
                top: 10,
                right: 15,
                left: 15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006AFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#006AFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey={
                  orderFilter === "bugun" || orderFilter === "kecha"
                    ? "hour"
                    : "day"
                }
                axisLine={false}
              />
              <YAxis axisLine={true} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={
                  orderFilter === "bugun" || orderFilter === "kecha"
                    ? "sells"
                    : "Sotilgan"
                }
                stroke="#006AFF"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="students-gender-info">
          <div className=" text-center align-items-center d-flex justify-content-center flex-column pt-3">
            <p>O’quvchilar jinsi</p>
            <div className="w-50 h-75 position-relative">
              <Circle
                percent={[
                  userStats?.gender?.yigitlar,
                  userStats?.gender?.qizlar,
                ]}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={["#006AFF", "#E6E9F2"]}
              />
              <span className="percent-p-circle-1">
                {studentGender === "man"
                  ? Math.round(userStats?.gender?.yigitlar)
                  : Math.round(userStats?.gender?.qizlar)}
                %
              </span>
            </div>
            <ul className="ul-gender d-flex justify-content-around w-75 p-3 text-center align-items-center">
              <li
                className="gender-man"
                onClick={() => setStudentGender("man")}
              >
                Yigitlar
              </li>
              <li
                className="gender-women"
                onClick={() => setStudentGender("woman")}
              >
                Qizlar
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="statistics-info-fourth d-flex pt-5 justify-content-around text-center align-items-center ">
        <div className="courses-statistics-main">
          <div className="header-country-statistics d-flex justify-content-between text-center align-items-center">
            <p>Joylashuv</p>
            <select name="" id="">
              <option value="">O'zbekiston</option>
              <option value="">Rossiya</option>
            </select>
          </div>
          <div className="coutry-statistics">
            {countries &&
              countries.slice(0, 8).map((x: CountriesProps) => (
                <div key={x.id}>
                  <div className="pb-1 d-flex justify-content-between">
                    <span>{x.country}</span>
                    <span>{x.percent}%</span>
                  </div>
                  <div>
                    <Line
                      percent={x.percent}
                      strokeWidth={5}
                      trailWidth={5}
                      strokeColor="#006AFF"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="courses-statistics">
          <div className="align-items-center d-flex justify-content-center flex-column pt-3">
            <p>Kurslar</p>
            <div className="w-50 h-75 pt-4 position-relative">
              <Circle
                percent={[coursesInfo.paid_courses, coursesInfo.free_courses]}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={["#006AFF", "#E6E9F2"]}
              />
              <span className="percent-p-circle">
                {coursesType === "paid"
                  ? Math.round(coursesInfo.paid_courses)
                  : Math.round(coursesInfo.free_courses)}
                %
              </span>
            </div>
          </div>
          <ul className="ul-gender d-flex justify-content-around w-75 pt-5 ml-5">
            <li className="gender-man" onClick={() => setCoursesType("paid")}>
              Pullik
            </li>
            <li className="gender-women" onClick={() => setCoursesType("free")}>
              Bepul
            </li>
          </ul>
        </div>
        <div className="category-statistics">
          <div className="d-flex justify-content-center text-center align-items-center flex-column pt-2">
            <p>Kurslar turkumi</p>
            <div className="w-50 h-75 pt-4 position-relative">
              <Circle
                percent={coursesCategoryArray}
                gapDegree={0}
                gapPosition="top"
                strokeWidth={14}
                trailWidth={14}
                transition="0.6s"
                strokeLinecap="round"
                strokeColor={[
                  "#F2C94C",
                  "#F2C94C",
                  "#6FCF97",
                  "#006AFF",
                  "#a83a32",
                  "#a2a832",
                  "#32a842",
                  "#32a88c",
                  "#3271a8",
                  "#7732a8",
                ]}
              />
              <span className="percent-p-circle">75%</span>
            </div>
            <ul className="list-categories pt-4">
              <li className="li_1">Biznes</li>
              <li className="li_2">IT texno</li>
              <li className="li_3">Ma'rifat</li>
              <li className="li_4">Boshqalar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
