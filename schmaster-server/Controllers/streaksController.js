const { User } = require('../Mongoose/Schema');

const addStreak = async (req, res) => {
    try {
        const { token } = req.body;
        const user = await User.findOne({ id: token });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Ensure streaks is a valid number, default to 0 if not
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



module.exports = { addStreak }