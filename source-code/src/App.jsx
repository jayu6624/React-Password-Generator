// import { useState, useCallback,useEffect } from "react";

// function App() {
//   const [lenght, setlength] = useState(8);
//   const [number, setnumber] = useState("flase");
//   const [character, setchar] = useState("flase");
//   const [password, setpassword] = useState("");

//   const passwordgenerator = () => {
//     let pas = "";
//     let str = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz";
//     if (number) str += "0123456789";
//     if (character) str += "@!$%^&*()?/~";
//     for (let i = 1; i <=lenght; i++) {
//       let char = Math.floor(Math.random() * str.length + 1);
//       pas += str.charAt(char);
//     }

//     setpassword(pas);
//   };
//   useEffect(()=>{
//     passwordgenerator()
//   },[lenght, number, character, passwordgenerator])

//   return (
//     <>
//       <div className="  p-4 w-full max-w-md mx-auto text-white border-zinc-50  justify-center bg-gray-800   relative top-7 rounded-lg">
//         <div className="text-center relative my-"> Password Generator</div>
//         <div className="  box-border">
//           <input
//             type="text"
//             className=" w-full  justify-center  inline-block relative top-1 rounded-lg  text-cyan-950"
//             placeholder="Password"
//             value={password}
//           />
//           <button className=" bg-blue-600 absolute px-2 py-1  right-3.5 rounded-lg    top-11 text-xs">
//             copy
//           </button>
//         </div>
//         <div className="flex text-sm gap-x-2 relative top-2">
//           <div className="flex items-center gap-x-1">
//             <input
//               type="range"
//               min={6}
//               max={100}
//               value={lenght}
//               onChange={(e) => {
//                 setlength(e.target.value);
//               }}
//               className="  cursor-pointer my-3"
//             />
//           </div>
//           <label htmlFor="" className=" flex relative top-2.5">
//             Length : {lenght}
//           </label>

//           <div className="flex item-center gap-x-1 mx-2">
//             <input
//               type="checkbox"
//               id="numberinput"
//               onChange={() => {
//                 setnumber((prev) => !prev);
//               }}
//             />
//             <label htmlFor="numberinput" className="relative top-2.5 ">
//               {" "}
//               Number
//             </label>

//             <div className="flex item-center gap-x-1 mx-2">
//               <input
//                 type="checkbox"
//                 id="numberinput"
//                 onChange={() => {
//                   setchar((prev) => !prev);
//                 }}
//               />
//               <label htmlFor="numberinput" className="relative top-2.5">
//                 Charcters
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumber) str += "0123456789";
    if (includeCharacters) str += "@!$%^&*()?/~";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      generatedPassword += str.charAt(charIndex);
    }

    setPassword(generatedPassword);
  }, [length, includeNumber, includeCharacters]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumber, includeCharacters, generatePassword]);

  return (
    <>
      <div className="p-4 w-full max-w-md mx-auto text-white justify-center bg-gray-800 relative top-7 rounded-lg   border">
        <div className="text-center relative my-">Password Generator</div>
        <div className="box-border">
          <input
            type="text"
            className="w-full justify-center inline-block relative top-1   text-center rounded-lg text-cyan-950"
            placeholder="Password"
            value={password}
            readOnly
            ref={passwordref}
          />
          <button
            className="bg-blue-600 absolute px-2 py-1 right-3.5 rounded-lg top-11 text-xs"
            onClick={() => {
              passwordref.current?.select();
              navigator.clipboard.writeText(password);
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 relative top-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer my-3"
            />
          </div>
          <label htmlFor="" className="flex relative top-2.5">
            Length: {length}
          </label>
          <div className="flex items-center gap-x-1 mx-2 relative">
            <input
              type="checkbox"
              id="numberInput"
              checked={includeNumber}
              onChange={() => setIncludeNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="relative  ">
              Number
            </label>
          </div>
          <div className="flex items-center gap-x-1 mx-2">
            <input
              type="checkbox"
              id="charactersInput"
              checked={includeCharacters}
              onChange={() => setIncludeCharacters((prev) => !prev)}
            />
            <label htmlFor="charactersInput" className="relative ">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
