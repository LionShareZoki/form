import { IValidationService } from "../interfaces/iValidationService";

export class ValidationService implements IValidationService {
  public ValidatePhoneNumber(phoneNumber: string) {
    const phoneRegex = /^\+\d{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) return false;
    return true;
  }

  public ValidateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return false;
    return true;
  }
}
