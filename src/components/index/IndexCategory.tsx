import { Link } from "react-router-dom"

import { CategoryParams } from "./__indexTypes"

const IndexCategory = ({ categoryName }: CategoryParams) => {

  return (

    <div>

      {categoryName} Category

      <br />

      <Link to={{ pathname: "/", search: "view=query" }}>Query</Link>

    </div>

  )

}

export default IndexCategory
