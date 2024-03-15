import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSDK } from "@metamask/sdk-react";
import hetuLogo from '@/assets/images/hetu-logo.png'
import hetucn from '@/assets/images/hetu-cn.png'

const Login = () => {

    const navigate = useNavigate();
    const { sdk, connected, connecting, provider, chainId } = useSDK()

    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            localStorage.setItem('accounts', accounts)
            navigate("/layout/home");
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    return (

        <div>
            <header className="flex justify-between items-center  p-4 bg-gray-900 shadow ">

                <Link to="/">  <a>
                    <img src={hetuLogo} alt="Logo" className="h-8" ></img>
                </a></Link>

            </header>



            <div>
                <div>
                    <div className="flex items-center justify-center h-screen bg-blue-950 ">
                        <div className="rounded-lg p-20 w-800">
                            <img
                                src={hetucn}
                                width="220"
                                height="220"
                                className="mx-auto mb-4"
                                alt="logo"
                            />
                            <h1 className="text-4xl font-bold text-center text-white">Welcome to Hetu Hips Playground</h1>
                                <div className="flex flex-col items-center justify-center">
                                    <button onClick={connect}
                                            className="py-2 mt-20 mb-4 text-balance font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">
                                        Connect MetaMask Login
                                    </button>
                                    {/*<button onClick={disconnect}*/}
                                    {/*        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect*/}
                                    {/*</button>*/}
                                </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default Login;