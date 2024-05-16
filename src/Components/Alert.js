import React from "react";

function Alert(props) {
    console.log(props)
  function toUpper() {
    let type = props.alert.type;
    if(props.alert.type==="danger"){
      type = "error";
    }else if(props.alert.type==="warning"){
      
    }
    let first = type.charAt(0).toUpperCase();
    let mainType = first + type.slice(1);
    return mainType;
  }
  return (
    <>
      <div className=" w-[50%] z-50 fixed top-4  right-0 flex justify-end h-[60px] "  >
        {props.alert &&
        <div className={`${props.alert.type==="error"?"bg-red-300/80":props.alert.type==="success"?"bg-green-300/80":"bg-yellow-300/80"} rounded-2xl  shadow-xl backdrop-blur-lg  z-10 flex justify-center items-center px-6 `}>
          {props.alert && (
            <div className={`${props.alert.type==="error"?"text-red-700":props.alert.type==="success"?"text-green-700":"text-yellow-700"} font-semibold text-base `} role="alert">
                <p><span className="font-bold  " >  {toUpper()} </span>:<span>  {props.alert.message} </span></p>
            
            </div>
          )}
        </div>
        }
      </div>
    </>
  );
}
export default Alert;
