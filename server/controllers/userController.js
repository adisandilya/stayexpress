
// // GET /api/users

// export const getUserData = async (req, res) => {
//     try {
//          const role =req.user.role;
//          const recentSearchedCities =req.user.recentSearchedCities;
//          res.json({success:true,role, recentSearchedCities});
//     } catch (error) {
//         res.json({success:false, message:error.message});
//     }
// }

// // stores user recent searched cities
// export const storeRecentSearchedCities = async (req, res) => {
//     try {
//         const {recentSearchedCity} = req.body;
//         const user = await req.user;

//         if(user.recentSearchedCities.length < 3){
//             user.recentSearchedCities.push(recentSearchedCity);
//         }else{
//          user.recentSearchedCities.shift(); // remove the oldest search
//             user.recentSearchedCities.push(recentSearchedCity); // add the new search
//         }
//         await user.save();
//         res.json({success:true, message:"City added"});
        
          
//     } catch (error) {
//         res.json({success:false, message:error.message});
//     }
// };




// import User from '../models/User.js';

// // POST /api/users/register
// export const registerUser = async (req, res) => {
//     try {
//         const { _id, username, email, image } = req.body;

//         let user = await User.findById(_id);
//         if (!user) {
//             user = await User.create({
//                 _id,
//                 username,
//                 email,
//                 image,
//                 recentSearchedCities: [],
//             });
//         }

//         res.status(201).json({ success: true, message: 'User registered or already exists', user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// GET /api/users
export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({ success: true, role, recentSearchedCities });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// POST /api/users/recentSearchedCities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const user = await req.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity);
        } else {
            user.recentSearchedCities.shift(); // remove oldest
            user.recentSearchedCities.push(recentSearchedCity); // add newest
        }

        await user.save();
        res.json({ success: true, message: "City added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
