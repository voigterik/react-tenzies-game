import "./Die.css";

export default function Die({value, isHeld, isClicked}) {
    return(
        <div onClick={isClicked} className={`b-die${isHeld ? " m-active" : ""}`}>{value}</div>
    );
}



















































// import "./Die.css";
// const Die = ({value, isActive, isClicked}) => {
//     return(
//         <div 
//             className={`b-die${isActive ? ` m-active` : ``}`}
//             onClick={isClicked}
//         >
//             {value}
//         </div>
//     );
// };
// export default Die;