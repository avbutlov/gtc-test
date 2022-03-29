import {SET_FORM_TYPE} from "../constants";

const initialState = {
    formType: 'authorization'
}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORM_TYPE:
            return {
                ...state,
                formType: action.payload
            }


        default:
            return state
    }
}