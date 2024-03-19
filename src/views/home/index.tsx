import {etc,getPublicKey}  from '@noble/secp256k1'
import {hkdf} from '@noble/hashes/hkdf'
import {sha256} from '@noble/hashes/sha256'
import  { useState } from "react";




function Home() {

    // const { sdk } = useSDK();
    const [signedMessage, setSignedMessage] = useState("1123123123");


    const handleConnectAndSign = async () => {
        try {
            // const message = "Login Nostr";
            // // @ts-ignore
            // const signature = await sdk?.connectAndSign({ msg: message });
            const signature = "d9a8843438c2a319dead72cb0b50a7959de881c63d1c99ee11065a9ebf7be6fd"
            const nostr_privateKey = await  privateKeyFromX(signature)
            console.log(nostr_privateKey)
            console.log(etc.bytesToHex(getPublicKey(nostr_privateKey)))
            setSignedMessage(nostr_privateKey);
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
        <div className='home-container'>
            <div>首页</div>
            <button
                className={`bg-gray-500 rounded-full hover:bg-gray-700 text-white font-bold py-2 px-4 ml-8 
                }`}
                onClick={handleConnectAndSign}
            >
                {signedMessage}
            </button>
        </div>
    )
}

export default Home