import { Link } from "react-router-dom"

const IndexQuery = () => {

  return (

    <div>

      IndexQuery

      <br />

      <Link to={{ pathname: "/", search: "view=category:cloth" }}>Clothes</Link>

      <br />

      <Link to={{ pathname: "/", search: "view=category:book" }}>Books</Link>

      <br />

      <Link to={{ pathname: "/", search: "view=category:shoe" }}>Shoes</Link>

      <br />

      <Link to={{ pathname: "/", search: "view=category:cosmetic" }}>Cosmetic</Link>

      <br />

      <Link to={{ pathname: "/", search: "view=category:cat" }}>Cat</Link>

      <br />

    </div>

  )

}

export default IndexQuery