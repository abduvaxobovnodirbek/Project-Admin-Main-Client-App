import React, { useCallback, useState } from "react";
import "./assets/login.css";
import Logo from "../../images/Logo1.svg";
import Hide from "../../images/Hide.svg";
import View from "../../images/View.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setRefreshToken, setRole, setToken} from "../../reducers/authReducer";
import { useHistory } from "react-router";
import { Routes } from "../../constans/Route";
import {toast} from "react-toastify";
import Cookies from "universal-cookie";
import moment from "moment";

function Login() {
  const [type, setType] = useState(true);
  const [data, setData] = useState<any>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError]= useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const cookie = new Cookies();
  const handleChange = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const loginHandler = useCallback(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data?.username);
    formData.append("password", data?.password);
    axios
      .post("https://backend.eduon.uz//backoffice/login", formData)
      // eslint-disable-next-line no-console
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          const role = res.data.data.admin.roles[0];
          const token = res.data.data.token.access;
          const refreshToken = res.data.data.token.refresh;
          dispatch(setToken({ token }));
          dispatch(setRefreshToken({ refreshToken }));
          dispatch(setRole({role}));
          // @ts-ignore
          cookie.set("access_token", token, {expires: new Date(moment().add(1, 'days')), path: "/"});
          // @ts-ignore
          cookie.set("refresh_token", refreshToken, {expires: new Date(moment().add(1, 'days')), path: "/"});
          history.replace({ pathname: Routes.Statistics });
        }
        else if (res.data.success === false) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false);
        }
      }).catch(() => {
        setLoading(false);
        toast.error("Bunday foydalanuvchi mavjud emas!!!", {
        position: toast.POSITION.TOP_RIGHT
      })
    });
  }, [data, dispatch, history, cookie]);
  return (
    <>
      <section className="sectionLoginPage">
        <div className="container">
          <div className="mainLoginPage">
            <div className="LoginPage-inner">
              <div className="login-courses_sec_btn ">
                <img src={Logo} alt="" />
                <h2 className="course_btn_active">ADMIN KIRISHI</h2>
              </div>
            </div>
            <div className="loginPage-input-item">
              <input
                type="text"
                className="loginPage-inner-item"
                placeholder="username kiriting"
                onChange={(e) => handleChange("username", e.target.value)}
              />
              <div className="parol-input">
                <input
                  className="loginPage-inner-item"
                  type={`${type ? "password" : "text"}`}
                  placeholder="parolni kiriting"
                  onChange={(e) => handleChange("password", e.target.value)}
                />

                <span
                  className="loginPage-inner-icon"
                  onClick={() => setType(!type)}
                >
                  <img src={`${type ? Hide : View}`} alt="" />
                </span>
              </div>
              <div className="button-box">
                <button
                  className="loginPage-btn-inner"
                  type="submit"
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Tizimga kirish
                </button>
              </div>
            </div>
            <div className="loginPage-btn-item"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
