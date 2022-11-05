import { UPDATE_FORM_ID } from "../constants/actionTypes";

const currentId = (postId = 0, action) => {
    switch (action.type) {
        case UPDATE_FORM_ID:
            return action.payload
        default:
            return postId
    }
}

export default currentId