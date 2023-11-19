import { IUserRepository } from "../interfaces/iUserRepository";
import { User } from "../data/models/user";
import { IValidationService } from "../interfaces/iValidationService";
import { IUserService } from "../interfaces/iUserService";

export class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  private readonly _validationService: IValidationService;

  constructor(
    userRepository: IUserRepository,
    validationService: IValidationService
  ) {
    this._userRepository = userRepository;
    this._validationService = validationService;
  }

  public async createUser(user: User) {
    if (!user.firstName || user.firstName.length === 0) {
      throw new Error("First name is required");
    }
    if (!user.lastName || user.lastName.length === 0) {
      throw new Error("Last name is required");
    }
    if (!user.address || user.address.length === 0) {
      throw new Error("Address is required");
    }
    if (!this._validationService.ValidateEmail(user.email)) {
      throw new Error("Email is missing or has an invalid format");
    }
    if (!this._validationService.ValidatePhoneNumber(user.phone)) {
      throw new Error("Phone is missing or has an invalid format");
    }
    if (user.isChecked !== true) {
      throw new Error("Checkbox must be checked");
    }

    if (await this._userRepository.getByEmail(user.email)) {
      throw new Error("Email is taken");
    }

    await this._userRepository.insertUser(user);
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this._userRepository.getByEmail(email);
  }
}
