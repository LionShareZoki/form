import { User } from "../data/models/user";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  insertUser(user: User): Promise<void>;
  getByEmail(email: string): Promise<User | null>;
}
