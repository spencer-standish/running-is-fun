const router = require('express').Router();
const Run = require('../models/run.model');

// Get all runs
router.route('/').get((req, res) => {
  Run.find()
    .then(runs => res.json(runs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new run
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const distance = Number(req.body.distance);
  const distanceUnit = req.body.distanceUnit;
  const hours = Number(req.body.hours) || 0;
  const minutes = Number(req.body.minutes) || 0;
  const seconds = Number(req.body.seconds) || 0;
  const date = Date.parse(req.body.date);
  const time = req.body.time;
  const pace = req.body.pace ? Number(req.body.pace) : null;
  const weather = req.body.weather || {};
  const temperature = weather.temperature || null;
  const conditions = weather.conditions || null;
  const notes = req.body.notes;

  const newRun = new Run({
    username,
    distance,
    distanceUnit,
    hours,
    minutes,
    seconds,
    date,
    time,
    pace,
    weather: { temperature, conditions },
    notes,
  });

  newRun.save()
    .then(() => res.json({ message: 'Run added successfully!'}))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a single run by ID
router.route('/:id').get((req, res) => {
  Run.findById(req.params.id)
    .then(run => res.json(run))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a run by ID
router.route('/update/:id').put((req, res) => {
Run.findById(req.params.id)
    .then(run => {
    if (!run) {
        return res.status(404).json('Run not found');
    }

    run.username = req.body.username;
    run.distance = Number(req.body.distance);
    run.distanceUnit = req.body.distanceUnit;
    run.hours = Number(req.body.hours) || 0;
    run.minutes = Number(req.body.minutes) || 0;
    run.seconds = Number(req.body.seconds) || 0;
    run.date = Date.parse(req.body.date);
    run.time = req.body.time;
    run.pace = req.body.pace ? Number(req.body.pace) : null;

    // Check if req.body.weather is defined before accessing its properties
    if (req.body.weather) {
        run.weather = {
        temperature: req.body.weather.temperature || null,
        conditions: req.body.weather.conditions || null,
        };
    } else {
        run.weather = {};
    }

    run.notes = req.body.notes;

    run.save()
        .then(() => res.json('Run updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a run by ID
router.route('/delete/:id').delete((req, res) => {
  Run.findByIdAndDelete(req.params.id)
    .then(() => res.json('Run deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
