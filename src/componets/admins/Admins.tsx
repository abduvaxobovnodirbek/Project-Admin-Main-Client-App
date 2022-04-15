import React, { useCallback, useEffect, useState } from "react";
import SkeletonLoader from "../loader/SkeletonLoader";
import EditIcon from "../../images/Edit.svg";
import DeleteIcon from "../../images/Delete.svg";
import "./admins.css";
import { api, API_VERSION } from "../../api/api";
import AdminIcon from "../../images/AdminIcon";
import moment from "moment";
import { toast } from "react-toastify";

export default function Admins () {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dataAdmin, setDataAdmin] = useState<any>(null);

    const handleChange = (name: string, value: string) => {
      setDataAdmin({
        ...dataAdmin,
        [name]: value
      })
    }

    const addNewAdmin = useCallback(() => {
      let formData = new FormData();
      const username = dataAdmin.username.includes("+") ? dataAdmin.username.replace("+", "") : dataAdmin.username
      formData.append("username", username)
      formData.append("password", dataAdmin.password)
      formData.append("role", dataAdmin.role.length > 0 ? dataAdmin.role : "Admin")
      formData.append("first_name", dataAdmin.firstname)
      if(edit) {
        api.put(`${API_VERSION}/edit-admin/${dataAdmin?.id}`, formData).then(res => {
          if(res) {
            api.get(`${API_VERSION}/admin-list`).then(res => {
              //@ts-ignore
              setData(res.results);
              setEdit(false);
              setOpenModal(false);
              setDataAdmin(null)
            }
             );
            toast.success("Muaffaqiyatli ozgartirildi", {
              position: toast.POSITION.TOP_RIGHT
          });
          
          }
        }) 
      }else {
       api.post(`${API_VERSION}/add-new-admin` , formData).then(res => {
         if(res) {
          api.get(`${API_VERSION}/admin-list`).then(res => {
            //@ts-ignore
            setData(res.results);
            setOpenModal(false);
            setDataAdmin(null)
         }
           );
          toast.success("Muaffaqiyatli qushildi", {
            position: toast.POSITION.TOP_RIGHT
        });
         }
       }).catch(() => {
        setOpenModal(false);
        toast.error("Xatolik, keyinroq urinib ko'ring", {
         position: toast.POSITION.TOP_RIGHT
     })
      })
       }
    }, [dataAdmin])
        
    const deleteAdmin = useCallback((id) => {
      api.delete(`${API_VERSION}/delete-admin/${id}`).then(res => {
        if(res) {
          toast.success("Muaffaqiyatli uchirildi", {
            position: toast.POSITION.TOP_RIGHT
        });
        api.get(`${API_VERSION}/admin-list`).then(res => {
          //@ts-ignore
          setData(res.results);
       }).catch(() => {
         setOpenModal(false);
         toast.error("Xatolik, keyinroq urinib ko'ring", {
          position: toast.POSITION.TOP_RIGHT
      })
       })
      }
      })
    }, []);

    const openEditModal = useCallback(value => {
      setOpenModal(true);
      setEdit(true);
      setDataAdmin({
        firstname: `${value?.admin?.first_name}  ${value?.admin?.last_name}`,
        password: value?.password || "", 
        role: value.roles[0] || "",
        username: value?.admin?.username || "",
        id: value?.id
      })      
    }, [])

    useEffect(() => {
      let mounted = true;
      setLoading(true);
        api.get(`${API_VERSION}/admin-list`).then(res => {
          if(mounted) {
             //@ts-ignore
          setData(res.results)
          setLoading(false);
          }
        })
        return () => {
          mounted = false;
        }
    }, [])
    
    return (
        <div className="speaker-block admin-block">
        <div className="second-block-speaker">
          <table className="pl-5">
            <thead>
              <tr>
                <th >Ism va tel.raqam</th>
                <th>Status</th>
                <th>Sana</th>
                <th>Kim tomonidan </th>
              </tr>
            </thead>
            <tbody>
        {data && data.map((x: any) => (
              <tr key={x?.admin?.id}>
                  <th
                      className="first-th-with-logo d-flex text-center align-items-center ml-2"
                  >
                    <AdminIcon />
                    <div className="pl-3 d-flex flex-column align-items-start" style={{paddingLeft: "20px"}}>
                      <p className="p-0 m-0">{x?.admin?.first_name}</p>
                      <span>{x?.admin?.username}</span>
                    </div>
                  </th>
                  <th>{x?.roles[0] ? x?.roles[0] : "Noaniq"}</th>
                  <th>{moment(x?.promoted_at).format("DD.MM.YYYY")}</th>
                  <th>{x?.promoted_by ?
                   `${x?.promoted_by?.first_name !== "" ? x?.promoted_by?.first_name : x?.promoted_by?.username} 
                    ${x?.promoted_by?.last_name !== ""? x?.promoted_by?.last_name : ""}` : "Noaniq"}</th>
                  <th onClick={() => openEditModal(x)}><img src={EditIcon} alt="" /></th>
                  <th onClick={() => deleteAdmin(x.id)}><img src={DeleteIcon}/></th>
                </tr>
        ))
               }
                  
           {loading && 
           <>
            <tr>
              <th><SkeletonLoader /></th>
              <th><SkeletonLoader /></th>
              <th><SkeletonLoader /></th>
              <th><SkeletonLoader /></th>
            </tr>
             <tr>
             <th><SkeletonLoader /></th>
             <th><SkeletonLoader /></th>
             <th><SkeletonLoader /></th>
             <th><SkeletonLoader /></th>
           </tr>
            <tr>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
            <th><SkeletonLoader /></th>
          </tr>
          </>
            }
            </tbody>
          </table>
          <div className="add-admin">
              <button onClick={() => setOpenModal(true)}>Administrator qo’shish</button>
          </div>
        </div>
        <div className={`modal-add ${openModal && "open"}`}>
             <div className="modal-body">
                 <div className="content-modal">
                 <div>
                     <p>Ism va Familiya</p>
                     <input onChange={e => handleChange("firstname", e.target.value)} value={dataAdmin?.firstname || ""}/>
                 </div>
                 <div >
                     <p>Telefon raqam(Shu bn tizimga kirasiz)</p>
                     <input onChange={e => handleChange("username", e.target.value)} value={dataAdmin?.username || ""}/>
                 </div>
                 <div>
                     <p>Vakolati</p>
                     <select name="" id="" onChange={(e) => handleChange("role", e.target.value)} defaultValue={dataAdmin?.role || ""}>
                         <option selected disabled hidden>Tanlang...</option>
                         <option value="Admin" selected={dataAdmin?.role === "Admin"}>Admin</option>
                         <option value="Owner" selected={dataAdmin?.role === "Owner"}>Owner</option>
                         <option value="Marketing manager" selected={dataAdmin?.role === "Marketing manager"}>Marketing manager</option>
                         <option value="Manager" selected={dataAdmin?.role === "Manager"}>Manager</option>
                     </select>
                 </div>
                 <div>
                     <p>Parol</p>
                     <input onChange={e => handleChange("password", e.target.value)} value={dataAdmin?.password || ""}/>
                 </div>
                 <div className="d-flex justify-content-around btn-div-modal">
                     <button onClick={() => {setOpenModal(false); setDataAdmin(null); setEdit(false)}}>Bekor qilish</button>
                     <button onClick={addNewAdmin}>{edit ? "Tahrirlash" : "Qo’shish"}</button>
                 </div>
                 </div> 
             </div>
         </div>
      </div>
    )
    }