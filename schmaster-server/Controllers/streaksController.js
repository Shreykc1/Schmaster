const { User, Streaks } = require('../Mongoose/Schema');

const addStreak = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ id: token });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

    
        let currentStreaks = Number.isNaN(user.streaks) ? 0 : user.streaks;
        if (user.streaks === null || user.streaks === undefined) {
            currentStreaks = 0;
        }

        if (!user.lastStreakUpdate || user.lastStreakUpdate < today) {
            const newStreakCount = currentStreaks + 1;
            await User.findOneAndUpdate(
                { id: token },
                { $set: { streaks: newStreakCount, lastStreakUpdate: today } }
            );
            return res.status(200).send({ message: 'Streaks Updated Successfully' });
        } else {
            return res.status(200).send({ message: 'Streak already updated for today' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};



const breakStreak = async (req,res) =>{
    try {
        const { token } = req.body;
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