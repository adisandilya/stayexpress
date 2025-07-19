
// GET /api/users

export const getUserData = async (req, res) => {
    try {
         const role =req.user.role;
         const recentSearchedCities =req.user.recentSearchedCities;
         res.json({success:true,role, recentSearchedCities});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

// stores user recent searched cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const {recentSearchedCity} = req.body;
        const user = req.user;

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCity);
        }else{
         user.recentSearchedCities.shift(); // remove the oldest search
            user.recentSearchedCities.push(recentSearchedCity); // add the new search
        }
        await user.save();
        res.json({success:true, message:"City added"});
        
          
    } catch (error) {
        res.json({success:false, message:error.message});
    }
};