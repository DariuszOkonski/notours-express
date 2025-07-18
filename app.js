const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!!!');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

const PATH = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(PATH));

const getAllTours = (req, res) => {
  // console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(PATH, JSON.stringify(tours), (err) => {
    return res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  return res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'getAllUsers' });
};

const createUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'createUser' });
};

const getUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'getUser' });
};

const updateUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'updateUser' });
};

const deleteUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'deleteUser' });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
