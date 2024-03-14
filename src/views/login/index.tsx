import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
import { Buffer } from 'buffer';


// config globle  buffer
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const Login = () => {

  const [mnemonic, setMnemonic] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const navigate = useNavigate();

  const handleMnemonicChange = (event) => {
    setMnemonic(event.target.value);
  };



  async function handleGenerateNew() {
    const sk = generateMnemonic();
    console.log(sk)
    try {
      const seed = mnemonicToSeedSync(sk);  //cousin rubber monster push lady lady rain wrist magnet slogan sword cool
      const convertedArray = new Uint8Array(seed.slice(0, 32));
      localStorage.setItem('sk', convertedArray.toString())
      console.log('convertedArray:', convertedArray);
      navigate("/layout/home");
    } catch (error) {
      //
      console.error('error:', error);
    }



  }

  async function handleLogin() {


    try {
      console.log('mnemonic', validateMnemonic(mnemonic));
      if (validateMnemonic(String(mnemonic))) {
        console.log('mnemonic illegal');

        //
        const seed = mnemonicToSeedSync(mnemonic);
        const convertedArray = new Uint8Array(seed.slice(0, 32));
        localStorage.setItem('sk', convertedArray.toString());
        console.log('convertedArray:', convertedArray);


        navigate("/layout/home");
      } else {


        setIsInvalid(true)
      }
    } catch (error) {
      console.error('error:', error);

    }
  }





  return (

      <div>

        <head>
          <title>DAO Voting Interface</title>
          <script src="https://unpkg.com/react/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
          <style>
          </style>
        </head>

        <header className="flex justify-between items-center mb-8 p-4 bg-white shadow rounded">

          <Link to="/">  <a>
            <img src="./logo.png" alt="Logo" className="h-8" ></img>
          </a></Link>

        </header>



        <div>
          <div>
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white rounded-lg p-20 w-800">
                <img
                    src="https://snort.social/nostrich_512.png"
                    width="48"
                    height="48"
                    className="rounded-full mx-auto mb-4"
                    alt="Avatar"
                />
                <h1 className="text-xl font-bold text-center">Welcome to Zsocial</h1>
                <form className="flex flex-col gap-4 mt-4">
                  <input
                      type="text"
                      placeholder="mnemonic"
                      className={`bg-gray-200 rounded-full py-2 px-28 ${isInvalid ? "invalid-input" : ""}`}
                      value={mnemonic}
                      onChange={handleMnemonicChange}
                  />


                  <div className="flex justify-between mb-4">
                    <button
                        type="button"
                        className="bg-gray-500 text-white rounded-full py-2 px-16"
                        onClick={handleGenerateNew}
                    >

                      <Link to="/">  Generate New </Link>
                    </button>

                    <button
                        type="button"
                        className="bg-orange-500 text-white rounded-full py-2 px-14"
                        onClick={handleLogin}
                    >
                      Login
                      {/* <Link to="/"> Login </Link> */}
                    </button>
                  </div>

                </form>
                <div className="flex flex-col items-center mt-4">
                  {/* <a href="/login/sign-up">Welcome to Zsocial</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>

  );
};

export default Login;