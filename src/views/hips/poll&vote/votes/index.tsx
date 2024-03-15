import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Pagination } from 'antd';
import {usePagination} from "@/utils/pagination/pagination.tsx";
import Loading from "@/components/loading"


function Votes() {

    const [searchText, setSearchText] = React.useState("");
    const [InitSearchData, setInitSearchData] = useState([]);
    const [searchData, setSearchData] = useState({
        id: 'null',
        title: 'null',
        info: 'null'
    });
    const [addr, setAddr] = React.useState('0x1231');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate("/login");
    };


    const [pageSize, setPageSize] = useState(10);
    const count = InitSearchData.length ;
    const _DATA = usePagination(InitSearchData, pageSize);
    const pageNumberChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        _DATA.jump(pageNumber);
    };

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        setPageSize(pageSize);
    };

    useEffect(() => {

        const local_sk = localStorage.getItem('sk')

        if (local_sk == null) {
            navigate("/login");
        } else {
            const numberArray = local_sk.split(",").map(Number)
            // make sure array equal to 32
            while (numberArray.length < 32) {
                numberArray.push(0); // 0
            }
            const sk = numberArray.map(num => num.toString(16).padStart(2, '0')).join('');

            console.log('sk', sk)

            setAddr('0x' + sk)
        }

        const intervalId = setInterval(() => {
            InitEvent();
        }, 4000);

        // clean timer
        return () => {
            clearInterval(intervalId);
        };


    }, []);


    async function InitEvent() {


        const socket = new WebSocket('wss://zsocialrelay1.nagara.dev');
        // RelayServer.send('["QUERY_SID"]');
        socket.onopen = () => {
            const message = JSON.stringify(["QUERYPOLLLIST", ""]);
            socket.send(message);
        };


        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setInitSearchData(data);
            console.log('Received data:', data);
            setIsLoading(false)

        };


        socket.onclose = () => {
            console.log('Socket connection closed');

        };
    }


    async function SearchEvent(searchText: string) {

        let lag = 0;

        for (let i in InitSearchData) {

            console.log("InitSearchData[i][0]", InitSearchData[i][0])
            console.log("searchText", searchText)
            if (InitSearchData[i][0] == searchText) {
                setSearchData({
                    id: InitSearchData[i][0],
                    title: InitSearchData[i][1],
                    info: InitSearchData[i][2]
                })
                lag = 1;

                // console.log("searchData",searchData, searchData.length)
            }
        }

        if (lag == 0) {
            setSearchData({
                id: 'null',
                title: 'null',
                info: 'null'
            })

            console.log("searchData", searchData)
        }

    }


    return (<div>
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="container mx-auto px-4 py-8">


                    <header className="flex justify-between items-center mb-8 p-4 bg-white shadow rounded">
                        <div className="flex justify-end">


                            <button className={`bg-green-700 rounded-full hover:bg-gray-700 text-white font-bold py-2 px-4 ml-8`}>
                                <Link to="/layout/poll&vote/new_vote"> New vote </Link>
                            </button>


                            <div className="relative inline-block">
                                <button
                                    className={`bg-gray-500 rounded-full hover:bg-gray-700 text-white font-bold py-2 px-4 ml-8 ${showDropdown ? "dropdown-open" : ""
                                    }`}
                                    onClick={handleButtonClick}
                                >
                                    {addr.length > 10
                                        ? `${addr.substring(0, 5)}...${addr.substring(addr.length - 5)}`
                                        : addr}
                                </button>

                                {showDropdown && (
                                    <div
                                        className="absolute mt-2 w-48 bg-gray-500 rounded-md shadow-lg overflow-hidden">

                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                                                onClick={handleLogoutClick}
                                            >Logout
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>


                        </div>

                    </header>


                    <div className="mx-auto w-3/5">

                        <div className="p-4">
                            <div className="bg-white p-4 rounded-md shadow-sm relative">
                                <h2 className="text-xl font-semibold mb-4">Search</h2>
                                <p className="text-gray-600 mb-4">Paste a nostr vote id.</p>
                                <p className="text-gray-600 mb-4">vote id are supported, write a filter by vote id.</p>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center flex-grow">
                                        <i className="fas fa-search search-icon"></i>
                                        <input
                                            type="text"
                                            placeholder="Search Vote ID"
                                            className="border border-gray-300 p-2 rounded-md search-input ml-2 mr-2 w-full" // 添加 w-full 类名
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => SearchEvent(searchText)}
                                    >
                                        Search
                                    </button>
                                </div>
                                <div>
                                    {searchData.id != 'null' ? (
                                        <Link to={`/detail/${searchData.id}`}
                                              className="bg-white p-4 rounded-md shadow-sm mb-8">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-500">
                                                    {searchData.id.length > 10 ? `${searchData.id.substring(0, 5)}...${searchData.id.substring(searchData.id.length - 5)}` : searchData.id}
                                                </span>


                                                <span
                                                    className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                                            </div>
                                            <h3 className="text-lg font-semibold">{searchData.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{searchData.info}</p>
                                        </Link>
                                    ) : (

                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <img
                                                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/bqaeh7vhobd/feedback.svg"
                                                alt="Placeholder image representing no data available"
                                            />
                                        </div>

                                    )}
                                </div>
                            </div>


                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4">Proposals</h2>

                                {_DATA.currentData().map((item) => (
                                    <Link to={`/layout/poll&vote/details/${item[0]}`} key={item[0]}>
                                        <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span
                                                    className="text-sm text-gray-500">
                                                    {
                                                        item[0]
                                                    }
                                                </span>
                                                <span
                                                    className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                                            </div>
                                            <h3 className="text-lg font-semibold">{item[1]}</h3>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item[2]}</p>
                                        </div>
                                    </Link>

                                ))}

                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    showQuickJumper
                                    defaultCurrent={1}
                                    total={count}
                                    onChange={pageNumberChange}
                                />

                                {/*<Pagination*/}
                                {/*    count={count}*/}
                                {/*    size="large"*/}
                                {/*    page={page}*/}
                                {/*    variant="outlined"*/}
                                {/*    shape="rounded"*/}
                                {/*    onChange={handleChange}*/}
                                {/*>*/}
                                {/*</Pagination>*/}


                            </div>
                        </div>
                    </div>


                </div>
            )}

        </div>


    </div>)

}


export default Votes;


