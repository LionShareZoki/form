import { User } from "data/models/user";

export interface IUserService {
  createUser(user: User): Promise<void>;
}
