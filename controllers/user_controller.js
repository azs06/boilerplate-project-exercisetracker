const  { User } = require('../models/User')

module.exports.createUser = (req, res) => {
    const { username } = req.body
    console.log(req.body)
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