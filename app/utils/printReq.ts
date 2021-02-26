import express from 'express';

export default (req: express.Request): void => {
  console.log(`${req.method} to ${req.originalUrl}`);
};
