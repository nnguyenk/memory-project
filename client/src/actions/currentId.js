import { UPDATE_FORM_ID } from "../constants/actionTypes"

export const updateFormId = (newId) => {
    return { type: UPDATE_FORM_ID, payload: newId }
}