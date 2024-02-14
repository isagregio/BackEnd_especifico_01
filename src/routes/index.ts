import express from 'express';
import { Router } from 'express';

import usersRouter from './users';
import piusRouter from './pius';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pius', piusRouter);

export default routes;