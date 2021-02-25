import printReq from '../utils/printReq';

export default (req, res) => {
  printReq(req);
  res.status(404);
  res.send();
};
