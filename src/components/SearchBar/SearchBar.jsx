import { useState } from "react"
import { Form } from "react-bootstrap"


const SearchBar = ({ handleSearchBar }) => {

    const [currentText, setText] = useState()

    return (

        <Form className="d-flex my-4">
            <Form.Control
                onChange={handleSearchBar}
                value={currentText}
                type="search"
                placeholder="Type what are you looking for"
                aria-label="Search"
            />
        </Form>
    )
}

export default SearchBar
