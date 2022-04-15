import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";
import "./assets/navbar.css";
import SideBarImg1 from "../../images/SideBarImg1";
import SideBarImg2 from "../../images/SideBarImg2";
import SideBarImg3 from "../../images/SideBarImg3";
import SideBarImg4 from "../../images/SideBarImg4";
import SideBarImg5 from "../../images/SideBarImg5";
import SideBarImg6 from "../../images/SideBarImg6";
import SideBarImg7 from "../../images/SideBarImg7";
import SideBarImg8 from "../../images/SideBarImg8";
import AdminIcon from "../../images/AdminIcon";
import LogoutImg from "../../images/LogoutImg";
import { NavLink, useHistory } from "react-router-dom";
import { Routes } from "../../constans/Route";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import {resetRefresh, resetRole, resetToken, roleSelector} from "../../reducers/authReducer";
import {useShallowEqualSelector} from "../../constans/useShallowSelector";
import {api, API_VERSION} from "../../api/api";
import {priceFormat} from "../../constans/PriceFormater";

interface Props {
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly isAuth: boolean;
}

export default function SideMenu({ open, setOpen, isAuth }: Props) {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();
  const role = useShallowEqualSelector(roleSelector);
  const logoutHandler = useCallback(() => {
    dispatch(resetToken());
    dispatch(resetRole());
    dispatch(resetRefresh());
    cookies.remove("access_token", {path: "/"});
    cookies.remove("refresh_token", {path: "/"});
    history.replace({ pathname: Routes.Login });
  }, [dispatch, history, cookies]);
  useEffect(() => {
    let mounted = true;
    api.get(`${API_VERSION}/eduon-revenue`).then(res => {
      if(mounted) {
        //@ts-ignore
        setData(res)
      }
    });
    return () => {
      mounted = false;
    }
  }, []);

  console.log(data?.eduon_revenue)
  return (
    <>
      <div
        className={`side-menu-bar ${open && "show-menu"} ${
          isAuth === false && "d-none"
        }`}
      >
        <ul className="d-flex flex-column h-75 text-center align-items-center pt-3">
          <NavLink to={Routes.Statistics}>
            <li
              className={`d-flex text-center align-items-center`}
              onClick={() => setOpen(false)}
            >
              <SideBarImg1 />
              <p>Statistika</p>
            </li>
          </NavLink>
        {(role === "Admin" || role === "Owner" || role === "Manager") &&  <NavLink
            to={Routes.Speakers}
            className={`${
              window.location.href.includes("speaker") && "active"
            }`}
          >
            <li
              className={`d-flex text-center align-items-center `}
              onClick={() => setOpen(false)}
            >
              <SideBarImg5 />
              <p>Spikerlar</p>
            </li>
          </NavLink>}
          {(role === "Admin" || role === "Owner" || role === "Manager")  && <NavLink
            to={Routes.Users}
            className={`${window.location.href.includes("user") && "active"}`}
          >
            <li
              className="d-flex text-center align-items-center"
              onClick={() => setOpen(false)}
            >
              <SideBarImg4 />

              <p>Foydalanuvchilar</p>
            </li>
          </NavLink>}
         { (role === "Admin" || role === "Owner" || role === "Manager")  &&
          <NavLink to={Routes.Courses}
         className={`${window.location.href.includes("course") && "active"}`}
         >
            <li
              className="d-flex text-center align-items-center"
              onClick={() => setOpen(false)}
            >
              <SideBarImg3 />

              <p>Kurslar</p>
            </li>
          </NavLink>}
        {(role === "Owner" || role === "Manager")  && <NavLink to={Routes.Economics} onClick={() => setOpen(false)}>
            <li className="d-flex text-center align-items-center">
              <SideBarImg2 />

              <p>Moliya</p>
            </li>
          </NavLink>}
        {(role === "Admin" || role === "Owner" || role === "Manager") && 
        <NavLink to={Routes.Accepts} onClick={() => setOpen(false)}
        className={`${window.location.href.includes("accept") && "active"}`}
        >
            <li className="d-flex text-center align-items-center">
              <SideBarImg6 />

              <p>Tasdiqlar</p>
            </li>
          </NavLink>}
         {( role === "Owner" || role === "Manager") &&  <NavLink to={Routes.Settings}>
            <li
              className="d-flex text-center align-items-center"
              onClick={() => setOpen(false)}
            >
              <SideBarImg7 />

              <p>Sozlamalar</p>
            </li>
          </NavLink>}
        {(role === "Owner" || role === "Manager")  &&   <NavLink to={Routes.Quarantine}>
            <li
              className="d-flex text-center align-items-center"
              onClick={() => setOpen(false)}
            >
              <SideBarImg8 />

              <p>Karantin</p>
            </li>
          </NavLink>}
          {(role === "Owner" || role === "Manager")  &&   <NavLink to={Routes.Admins}>
            <li
              className="d-flex text-center align-items-center"
              onClick={() => setOpen(false)}
            >
              <AdminIcon />

              <p>Adminlar</p>
            </li>
          </NavLink>}
          <a onClick={logoutHandler}>
            <li className="d-flex text-center align-items-center"
            onClick={() => setOpen(false)}>
              <LogoutImg />
              <p style={{ color: "rgba(17 ,17 ,17, 0.5)" }}>Chiqish</p>
            </li>
          </a>
        </ul>
        <div className="footer-text">
          <p className="font-weight-bolder">{priceFormat(Math.round(data?.eduon_revenue))} so'm</p>
          <p>Eduon Foydasi</p>
        </div>
      </div>
      <div
        className={`close-navbar ${open && "back"}`}
        onClick={() => setOpen(false)}
      >
        Click
      </div>
    </>
  );
}
