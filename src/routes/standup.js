import express from 'express';
import standupCtrl from '../controllers/standup.server.controller';
const router = express.Router();


/* GET /standup/  */
router.get('/', (req, res) => {
  return standupCtrl.list(req,res);
});

/* POST /standup/ filter by member name - hame page */
router.post('/', (req,res) => {
  return standupCtrl.filterByMember(req, res);
})

/* GET New Note page /standup/newnote  */
router.get('/newnote', (req, res) => {

  return standupCtrl.getNote(req,res);
});

/* POST New Note page /standup/newnote  */
router.post('/newnote', (req, res) => {
  console.log(req.body);
  return standupCtrl.create(req,res);
});

export default router;
