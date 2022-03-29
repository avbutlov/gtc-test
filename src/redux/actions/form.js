import {SET_FORM_TYPE} from "../constants";

export const setFormType = (formType) => ({
    type: SET_FORM_TYPE,
    payload: formType
})