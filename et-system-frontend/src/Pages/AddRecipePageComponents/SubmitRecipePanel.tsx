import React from "react";
import {Button, Input} from "reactstrap";
import './ARPStylesheet.css'

const SubmitRecipePanel = ({handleChange, handleSubmit}) => {

    return (
        <div className={'ARP-submit-panel'}>
        <p className={'ARP-submit-panel-name'}>Submit recipe</p>
        <Input type="text" name="recipe_label" id="recipe_label"
               className = "recipe-name-input"
               onChange={handleChange}
               placeholder={"Name.."}
        />
        <textarea
            id={"recipe_description"}
            className="paragraph-input"
            onChange={handleChange}
            placeholder={"Description..."}
        />
        <Button color="primary" className={"submit-button"} onClick={handleSubmit}>SUBMIT</Button>
    </div>
    )
}

export default SubmitRecipePanel;