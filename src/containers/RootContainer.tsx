import React, {useMemo, useState} from "react";
import Navbar from "../componets/navbar/navbar";
import SideMenu from "../componets/navbar/SideMenu";
import {Redirect, Route, Switch} from "react-router";
import {Routes} from "../constans/Route";
import Statistics from "../componets/statistics/Statistics";
import Speakers from "../componets/speakers/Speakers";
import Users from "../componets/users/Users";
import Courses from "../componets/courses/Courses";
import Economics from "../componets/economics/Economics";
import Accepts from "../componets/accepts/Accepts";
import Setting from "../componets/settings/Setting";
import Quarantine from "../componets/quaratine/Quarantine";
import SpeakerId from "../componets/speakers/SpeakerId";
import UserId from "../componets/users/UserId";
import {useShallowEqualSelector} from "../constans/useShallowSelector";
import {roleSelector, tokenSelector} from "../reducers/authReducer";
import Login from "../componets/login/Login";
import CoursesId from "../componets/courses/CoursesId";
import Admins from "../componets/admins/Admins";
import AcceptId from "../componets/accepts/AcceptId";

export default function RootContainer() {
    const [openMenu, setOpenMenu] = useState(false);
    const token = useShallowEqualSelector(tokenSelector);
    const isAuthorized = useMemo(() => Boolean(token), [token]);
    const role = useShallowEqualSelector(roleSelector);
    
    return (
        <div className="wrapper">
            <Navbar setOpen={setOpenMenu} isAuth={isAuthorized}/>
            <div className="d-flex">
                <SideMenu open={openMenu} setOpen={setOpenMenu} isAuth={isAuthorized}/>
                {!isAuthorized && <Redirect to={Routes.Login}/>}
                {!isAuthorized && (
                    <Route path={Routes.Login} component={Login} exact={true}/>
                )}
                {isAuthorized && (
                    <div className={`content-container ${openMenu && "overlay"}`}>
                        <Switch>
                            <>
                                <Redirect
                                    to={Routes.Statistics}
                                    from={Routes.Main}
                                    exact={true}
                                />
                                <Route path={Routes.Statistics} component={Statistics}/>
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.Speakers} component={Speakers}/>}
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.SpeakerId} component={SpeakerId}/>}
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.Users} component={Users}/> }
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.UsersId} component={UserId}/>}
                                {(role === "Admin" || role === "Owner" || role === "Manager") &&<Route path={Routes.Courses} component={Courses}/>}
                                {(role === "Admin" || role === "Owner" || role === "Manager") &&<Route path={Routes.CoursesId} component={CoursesId}/>}
                                {(role === "Owner" || role === "Manager" ) && <Route path={Routes.Economics} component={Economics}/> }
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.Accepts} component={Accepts}/> }
                                {(role === "Admin" || role === "Owner" || role === "Manager") && <Route path={Routes.AcceptId} component={AcceptId}/> }
                                {(role === "Owner" || role === "Manager") && <Route path={Routes.Settings} component={Setting}/> }
                                {(role === "Owner" || role === "Manager") && <Route path={Routes.Quarantine} component={Quarantine}/> }
                                {(role === "Owner" || role === "Manager") && <Route path={Routes.Admins} component={Admins}/> }
                            </>
                        </Switch>
                    </div>
                )}
            </div>
        </div>
    );
}
