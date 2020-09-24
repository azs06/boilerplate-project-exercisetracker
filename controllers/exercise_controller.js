const { Exercise } = require('../models/Exercise');
const { User } = require('../models/User');
const { formatDate } = require('../util/index');

module.exports.createExercise = (req, res) => {
    const { description, userId, duration, date } = req.body;
    const exercise = new Exercise({description, duration, date : date ? date : new Date(), userId})
    exercise.save()
        .then(result => {
            User.findById(userId, function(error, user){
                if(error) return res.status(500).json({error})
                user.exercises.push(exercise);
                user.save();
                res.json({
                    _id: user._id,
                    username: user.username,
                    date: new Date(result.date).toDateString(),
                    duration: result.duration,
                    description: result.description
                })
            })
        })
        .catch(error => {
            res.status(500).json({ error });
        })
}