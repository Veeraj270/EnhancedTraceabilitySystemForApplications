import RecipeTable from "./RecipePageComponents/RecipeTable";

const RecipesPage = () => {
    return (
        <div className='recipe-page'>
            <h1 className={'RP-title'}>Recipes</h1>
            <div className={'RP-grid-container'}>
                <div className={'RP-grid-column'}>
                    <RecipeTable />
                </div>
                <div className={'RP-grid-column'}>

                </div>
            </div>

        </div>
    )
}

export default RecipesPage