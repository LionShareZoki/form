import { MyFormData } from "./formTypes";

export const SUBMIT_FORM = "SUBMIT_FORM";
export const RESET_FORM = "RESET_FORM";

interface SubmitFormAction {
  type: typeof SUBMIT_FORM;
  payload: MyFormData;
}

interface ResetFormAction {
  type: typeof RESET_FORM;
}

export const submitForm = (formData: MyFormData): SubmitFormAction => ({
  type: SUBMIT_FORM,
  payload: formData,
});

export const resetForm = (): ResetFormAction => ({
  type: RESET_FORM,
});

export type FormAction = SubmitFormAction | ResetFormAction;
