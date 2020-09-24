const  { User } = require('../models/User')

module.exports.createUser = (req, res) => {
    const { username } = req.body
    const user = new User({username})
    user.save()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json({error})
        })
}

module.exports.getUser = (req, res) => {
    User.findOne({ username: req.params.username })
      .populate('exercises')
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };

  module.exports.getUsers = (req, res) => {
    User.find()
      .then(result => {
        const users = result.map(user => {
          return {
            _id: user._id, username: user.username
          }
        })
        return res.json(users)
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }