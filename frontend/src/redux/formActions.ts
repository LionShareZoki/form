export const SUBMIT_FORM = "SUBMIT_FORM";
export const RESET_FORM = "RESET_FORM";

interface SubmitFormAction {
  type: typeof SUBMIT_FORM;
  payload: FormData;
}

interface ResetFormAction {
  type: typeof RESET_FORM;
}

export const submitForm = (formData: FormData): SubmitFormAction => ({
  type: SUBMIT_FORM,
  payload: formData,
});

export const resetForm = (): ResetFormAction => ({
  type: RESET_FORM,
});

export interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  isChecked: boolean;
}

export type FormAction = SubmitFormAction | ResetFormAction;
