import React from "react"
import { TextField } from "@material-ui/core"

const FormEntry = ({ entryName, postData, setPostData }) => {
    const upperCaseName = entryName.charAt(0).toUpperCase() + entryName.slice(1)
    
    return (
        <TextField
            name={entryName}
            variant="outlined"
            label={upperCaseName}
            fullWidth
            value={postData[entryName]}
            onChange={(e) => setPostData(prev => {
                const newValue = entryName === "tags" ? e.target.value.split(",") : e.target.value
                return { ...prev, [entryName]: newValue }
            })}
        />
    )
}

export default FormEntry