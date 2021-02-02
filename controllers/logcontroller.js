let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
let Log = require('../db').import('../models/log');

// router.get('/practice', validateSession, function(req, res){
//     res.send('Hey!! This is a practice route')
// })
// new route added makes endpoint: http://localhost:4000/log/
router.post('/', validateSession, (req,res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
})

router.get("/", (req, res) => {
    Log.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
});

router.get("/:id",validateSession, (req,res) => {
    let userid = req.user.id
    Log.findAll({
        where: {owner_id: userid}
        })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))    
});

router.put("/:entryId", validateSession, function (req, res) {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    };
    const query = { where: { id: req.params.entryId, owner_id: req.user.id}};

    Log.update(logEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err}));
});

router.delete("/:id", validateSession, function(req, res){
const query = { where: { id: req.params.id, owner_id: req.user.id }};

Log.destroy(query)
.then(() => res.status(200).json({ message: "Log Entry Removed" }))
.catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;