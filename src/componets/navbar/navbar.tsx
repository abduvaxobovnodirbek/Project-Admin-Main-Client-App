import React, { Dispatch, SetStateAction } from "react";
import "./assets/navbar.css";
import Logo from "../../images/Eduon-logo.png";
import user from "../../images/user.png";
import {useShallowEqualSelector} from "../../constans/useShallowSelector";
import {roleSelector} from "../../reducers/authReducer";

interface Props {
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly isAuth: boolean;
}

export default function Navbar({ setOpen, isAuth }: Props) {
  const role = useShallowEqualSelector(roleSelector);
  return (
    <div
      className={`navbar justify-content-between ${
        isAuth === false && "d-none"
      }`}
    >
      <div className="d-flex justify-content-center text-center align-items-center">
        <div className="ml-4 mr-3" onClick={() => setOpen((prev) => !prev)}>
          <button className="burger-menu-btn">
            <span />
            <span />
            <span />
          </button>
        </div>
        <img src={Logo} alt="" />
      </div>
      <div className="profile-logo mr-5">
        {/*<div className="image-navbar">*/}
        {/*  <img src={user} alt="" />*/}
        {/*</div>*/}
        <div className="">
          <p className="mt-1">{role}</p>
          {/*<span>Super admin</span>*/}
        </div>
      </div>
    </div>
  );
}
