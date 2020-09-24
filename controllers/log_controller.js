const { Exercise } = require('../models/Exercise');
const { User } = require('../models/User');
const { ObjectId } = require('mongodb');

module.exports.log = (req, res) => {
    const userId = req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const _id = ObjectId(userId);
    const dateFilter = {};
    if(to){
        dateFilter.$lte = new Date(to).toISOString();
    }
    if(from){
        dateFilter.$gte = new Date(from).toISOString();
    }
    const filter = {userId: _id};
    if(Object.values(dateFilter).length > 0){
        filter.date = dateFilter
    }
    Exercise.find(filter)
        .limit(limit)
        .then(result => {
            User.findById(userId)
                .then((userData) => {
                    const { username } = userData;
                    const count = result.length;
                    const log = result
                    .sort((firstExercise, secondExercise) => new Date(firstExercise.date) > new Date(secondExercise.date))
                    .map(logData => {
                        return {
                            description: logData.description,
                            duration: logData.duration,
                            date: new Date(logData.date).toDateString()
                        }
                    })
                    res.json({
                        _id: userId,
                        username,
                        count,
                        log,
                    })   
                })
        })
        .catch(error => {
            res.status(500).json(error)
        })
}