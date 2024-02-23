import React, {useEffect, useState} from "react";
import {IngredientQuantity} from "../Interfaces/IngredientQuantity";
import {Input, Label} from "reactstrap";
import "./ARPStylesheet.css"

const IngredientQuantityPanel = ({props}) => {

    const [data, setData] = useState(props)
    const [ingredientQuantity, setIngredientQuantity] = useState<IngredientQuantity>()

    useEffect(() => {
        setData(props)
        console.log(props)
    }, [props])

    const handleChange = (event) => {
        const {name, value} = event.target
        setIngredientQuantity({...ingredientQuantity, [name]: value})
    }

    return(
        <div className={"ARPSummary-grid"}>
            <p className={"ARPSummary-name"}>
                <b>Ingredient: </b>
                {data.label}
            </p>
            <div className={"ARPSummary-item"}>
            </div>
            <div className={"ARPSummary-item"}>
                <Label for="quantity">Quantity:</Label>
                <Input type="number" name="quantity" id="quantity" value={ingredientQuantity?.quantity || {}}
                       onChange={handleChange}/>
            </div>
        </div>
    )

}

export default IngredientQuantityPanel;