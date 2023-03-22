import { Search } from "../components"

const HomePage = ({user}) => {

  return (
    <>
      <h1>Home Page</h1>

      { !user ? (
        <p>The user is not logged in.</p>
      ) : (
        <p>The user is logged in.</p>
      )}

      <Search/>
    </>
  )
}

export default HomePage