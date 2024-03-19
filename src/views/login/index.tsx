import { Link, useNavigate } from 'react-router-dom';
import { useSDK } from "@metamask/sdk-react";
import hetuLogo from '@/assets/images/hetu-logo.png'
import hetucn from '@/assets/images/hetu-cn.png'
import {etc, getPublicKey} from "@noble/secp256k1";
import {useState} from "react";
import {sha256} from "@noble/hashes/sha256";
import {hkdf} from "@noble/hashes/hkdf";

const Login = () => {

    const navigate = useNavigate();
    const { sdk } = useSDK()

    const [privateKey, setPrivateKey] = useState("1123123123");
    const [publicKey, setPublicKey] = useState("1123123123");
    const connect = async () => {
        try {
            const accounts = await sdk?.connect();
            localStorage.setItem('accounts', accounts)
            navigate("/layout/home");
        } catch (err) {
            console.warn("failed to connect..", err);
        }
    };

    const disConnect = async () => {
       sdk?.terminate()
    };


    const handleConnectAndSign = async () => {
        try {
            const message = "Login Nostr";
            // @ts-ignore
            const signature = await sdk?.connectAndSign({ msg: message });
            // const signature = "d9a8843438c2a319dead72cb0b50a7959de881c63d1c99ee11065a9ebf7be6fd"
            const nostr_privateKey = await  privateKeyFromX(signature)
            console.log(nostr_privateKey)
            console.log(etc.bytesToHex(getPublicKey(nostr_privateKey)))
            setPrivateKey(nostr_privateKey);
            setPublicKey(etc.bytesToHex(getPublicKey(nostr_privateKey)));
            sdk?.terminate();
        } catch (error) {
            console.error("Error in signing:", error);
        }
    };

    async function privateKeyFromX(sig: string) {
        const inputKey = await sha256(etc.hexToBytes(sig.toLowerCase().startsWith("0x") ? sig.slice(2) : sig))
        const info = `${sig}`
        const salt = await sha256(`${sig.slice(-64)}`)
        const hashKey = await hkdf(sha256, inputKey,salt, info,42)
        return etc.bytesToHex(etc.hashToPrivateKey(hashKey))
    }

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

                                <button onClick={disConnect}
                                        className="py-2 mt-20 mb-4 text-balance font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">
                                    DisConnect MetaMask
                                </button>
                                {/*<button onClick={disconnect}*/}
                                {/*        className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect*/}
                                {/*</button>*/}

                                <button onClick={handleConnectAndSign}
                                        className="py-2 mt-20 mb-4 text-balance font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">
                                    generate bip private key
                                </button>
                                PrivateKey: <text>{privateKey} </text>
                                PublicKey: <text>{publicKey}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default Login;