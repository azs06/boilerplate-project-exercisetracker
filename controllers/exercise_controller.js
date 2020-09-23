const { Exercise } = require('../models/Exercise');
const { User } = require('../models/User');

module.exports.createExercise = (req, res) => {
    const { description, userId, duration, date } = req.body;
    console.log(req.body)
    const exercise = new Exercise({description, duration, date, userId})
    exercise.save()
        .then(result => {
            User.findById(userId, function(error, user){
                if(error) return res.status(500).json({error})
                user.exercises.push(exercise);
                user.save();
                res.json({
                    _id: user._id,
                    username: user.username,
                    date: result.date,
                    duration: result.duration,
                    description: result.description
                })
            })
        })
        .catch(error => {
            res.status(500).json({ error });
        })
}