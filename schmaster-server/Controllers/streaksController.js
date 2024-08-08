const { User, Streaks } = require('../Mongoose/Schema');
const { getIo } = require('../socket');


const addStreak = async (req, res) => {
    try {
        const { testDate } = req.body;
        const token = req.cookies.token;
        const user = await User.findOne({ id: token });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const today = testDate ? new Date(testDate) : new Date();
        today.setHours(0, 0, 0, 0);

        let currentStreaks = Number.isNaN(user.streaks) ? 0 : user.streaks;
        if (user.streaks === null || user.streaks === undefined) {
            currentStreaks = 0;
        }

        const lastStreakUpdate = user.lastStreakUpdate ? new Date(user.lastStreakUpdate) : null;
        if (lastStreakUpdate) {
            lastStreakUpdate.setHours(0, 0, 0, 0);
        }

        const diffTime = lastStreakUpdate ? today - lastStreakUpdate : 0;
        const diffDays = lastStreakUpdate ? Math.floor(diffTime / (1000 * 60 * 60 * 24)) : 0;

        if (!lastStreakUpdate || diffDays > 0) {
            const newStreakCount = currentStreaks + diffDays;

            await User.findOneAndUpdate(
                { id: token },
                { $set: { streaks: newStreakCount, lastStreakUpdate: today } }
            );

            const io = getIo();
            io.emit('newStreak', newStreakCount);
            return res.status(200).send({ message: 'Streaks Updated Successfully', newStreakCount });
        } else {
            const io = getIo();
            io.emit('newStreak', currentStreaks);
            return res.status(200).send({ message: 'Streak already updated for today', currentStreaks });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = { addStreak };



function protect(req, res) {
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
  
      res.json({ message: "Protected data", user: decoded.username });
    });
  }

const breakStreak = async (req,res) =>{
    try {
        const token = req.cookies.token;
        const found = await User.findOne({id: token});
        if (found){
            const pushStreak = await Streaks.create({
                userID: found.id,
                streaks: found.streaks
        });

        const user = await User.findOneAndUpdate(
            { id: token },
            { $set: { streaks: 0 } }
        );
        }

        const io = getIo();
        io.emit('newStreak', 0)
        
        return res.status(200).send({ message: 'Streaks Updated Successfully' });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}


const getUserStreaks = async (req,res) => {
    try {
        const { user_id } = req.body;
        const user = await Streaks.find({userID: user_id});
    
        if(!user) throw Error
    
        res.status(200).json({
            message: user
        });
    
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}



module.exports = { addStreak, breakStreak, getUserStreaks }