export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public address: string;
  public phone: string;
  public email: string;
  public isChecked: boolean;

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string,
    isChecked: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.isChecked = isChecked;
  }
}
