import React, {useCallback, useEffect, useMemo, useState} from "react";
import "./assets/economics.css";
import EconomicsTable from "../table/EconomicsTable";
import {api, API_VERSION} from "../../api/api";
import SkeletonLoader from "../loader/SkeletonLoader";

export default function Economics() {
    const [category, setCategory] = useState("all");
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [nextData, setNextData] = useState("");
    useEffect(() => {
        setLoading(true);
        let mounted = true;
        api.get(`${API_VERSION}/kirim-chiqim`, {
            params: {
                query: category
            }
        }).then(res => {
            setLoading(false);
            if (mounted) {
                //@ts-ignore
                setData(category === "eduon" ? [...res?.results?.orders] :
                    //@ts-ignore
                    category === "users" ? [...res?.results?.orders.concat(...res.results.payforbalances)] :
                        //@ts-ignore
                        category === "speakers" ? [...res?.results?.orders.concat(...res.results.transactions)] :
                            //@ts-ignore
                            [...res.results?.orders?.concat(...res?.results?.payforbalances?.concat(...res.results.transactions))]
                );
                //@ts-ignore
                setNextData(res.next)
            }
        });
        return () => {
            mounted = false;
        }
    }, [category]);
    const getNextData = useCallback(() => {
        api.get(`${nextData}`).then(res => {
            //@ts-ignore
            setData(prev => category === "users" ? [...prev, ...res?.results?.orders.concat(...res.results.payforbalances)] :
                //@ts-ignore
                category === "speakers" ? [...prev, ...res?.results?.orders.concat(...res.results.transactions)] :
                    //@ts-ignore
                    category === "eduon" ? [...prev , ...res?.results?.orders] :
                        //@ts-ignore
                        [...prev, ...res.results?.orders?.concat(...res?.results?.payforbalances?.concat(...res.results.transactions))]
            );
            //@ts-ignore
            setNextData(res.next)
        })
    }, [nextData]);
    
    return (
        <div className="economics-container">
            <div className="first-block-economics">
                <div className="d-flex justify-content-between w-50 pl-3 pb-4 ">
                    <h1 className={`${category === "all" && "active"}`} onClick={() => setCategory("all")}>Barchasi</h1>
                    <h1 className={`${category === "users" && "active"}`} onClick={() => setCategory("users")}>User
                        hamyoni</h1>
                    <h1 className={`${category === "speakers" && "active"}`}
                        onClick={() => setCategory("speakers")}>Spiker hamyoni</h1>
                    <h1 className={`${category === "eduon" && "active"}`}
                        onClick={() => setCategory("eduon")}>Eduon hamyoni</h1>
                </div>
            </div>
            <div className="d-flex flex-column mt-4">
                {!loading && data && data?.map((x: any) => (
                    <EconomicsTable send={x?.type !== "transaction"} data={x} category={category}/>
                ))}
                {loading &&
                <>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                </>
                }
                {!loading && <div className="show-more-btn" onClick={getNextData}>
                    <button>Yana ko'rish</button>
                </div>}
            </div>
        </div>
    );
}
