import React from "react";
import {Button, Input} from "reactstrap";
import './ARPStylesheet.css'

// @ts-ignore
const SubmitRecipePanel = ({recipe, handleChange, handleSubmit}) => {

    // "handleChange" changes the label of the "recipe" which are both passed as props
    // The recipe(which is a state of the parent component) is submitted with handleSubmit which is also passed as a prop
    return (
        <div className={'ARP-submit-panel'}>
            <p className={'ARP-submit-panel-name'}>Submit recipe</p>
            <Input type="text" name="label" id="label"
               className = "recipe-name-input"
               onChange={handleChange}
               value={recipe?.label}
               placeholder={"Name.."}
            />
            <textarea
                id={"description"}
                name={"description"}
                className="paragraph-input"
                value={recipe?.description}
                onChange={handleChange}
                placeholder={"Description..."}
            />
            <Button className={"submit-button"} onClick={handleSubmit}>SUBMIT</Button>
        </div>
    )
}

export default SubmitRecipePanel;