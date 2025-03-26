import { User } from './schema-types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}