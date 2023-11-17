export const SUBMIT_FORM = "SUBMIT_FORM";
export const RESET_FORM = "RESET_FORM";

interface SubmitFormAction {
  type: typeof SUBMIT_FORM;
  payload: MyFormData;
}

interface ResetFormAction {
  type: typeof RESET_FORM;
}

export interface MyFormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  isChecked: boolean;
}

export type FormAction = SubmitFormAction | ResetFormAction;
