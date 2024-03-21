import React from "react";
import './ARPStylesheet.css'

// @ts-ignore
const SubmitRecipePanel = ({recipe, handleChange, handleSubmit}) => {

    // "handleChange" changes the label of the "recipe" which are both passed as props
    // The recipe(which is a state of the parent component) is submitted with handleSubmit which is also passed as a prop
    return (
        <div className={'ARP-submit-panel'}>
            <p className={'ARP-submit-panel-name'}>Submit recipe</p>
            <input type="text" name="label" id="label"
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
            <button className={"submit-button"} onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}

export default SubmitRecipePanel;