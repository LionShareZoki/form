export interface IValidationService {
  ValidatePhoneNumber(phoneNumber: string): boolean;

  ValidateEmail(email: string): boolean;
}
