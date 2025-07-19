// import React from "react";
// import { assets } from "../assets/assets";

// const StarRating = ({rating= 4}) => {
//   return (
//     <>
//       {Array(5)
//         .fill("")
//         .map((_, index) => (
//            <img src={rating >index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className=" w-4.5 h-4.5"   />
//         ))}
//     </>
//   );
// };

// export default StarRating;
import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index} // ✅ Add key here
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
            alt="star-icon"
            className="w-4.5 h-4.5"
          />
        ))}
    </>
  );
};

export default StarRating;

