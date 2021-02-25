export default (responseToEmulate, res) => res
  .status(responseToEmulate.status)
  .set(responseToEmulate.headers)
  .send(responseToEmulate.body);
