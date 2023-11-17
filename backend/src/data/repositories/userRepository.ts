import { User } from "../models/user";
import { Database } from "sqlite3";
import { IUserRepository } from "../../interfaces/iUserRepository";

export class UserRepository implements IUserRepository {
  private readonly _context: Database;

  constructor(context: Database) {
    this._context = context;
  }

  public async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._context.all("SELECT * FROM Users", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const users = rows.map((row) => {
            const assertedRow = row as User;
            return new User(
              assertedRow.id,
              assertedRow.firstName,
              assertedRow.lastName,
              assertedRow.address,
              assertedRow.phone,
              assertedRow.email,
              assertedRow.isChecked
            );
          });
          resolve(users);
        }
      });
    });
  }

  public async insertUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Users (firstName, lastName, address, phone, email, isChecked)
                     VALUES (:firstName, :lastName, :address, :phone, :email, :isChecked)`;

      this._context.run(
        query,
        {
          ":firstName": user.firstName,
          ":lastName": user.lastName,
          ":address": user.address,
          ":phone": user.phone,
          ":email": user.email.toLowerCase(),
          ":isChecked": user.isChecked,
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  public async getByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Users u WHERE u.email = :email ";
      this._context.get(
        query,
        {
          ":email": email.toLowerCase(),
        },
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row as User);
          }
        }
      );
    });
  }
}
