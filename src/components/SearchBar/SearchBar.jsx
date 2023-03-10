import { useState } from "react"
import Form from 'react-bootstrap/Form';


const SearchBar = ({ filterFests }) => {

    const [filter, setFilter] = useState("")


    const handleFilter = e => {
        setFilter(e.target.value)
        filterFests(e.target.value)

    }
    return (
        <>
            <input type="text" value={filter} onChange={handleFilter} />
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check checked={hasStock} onChange={handleStockChange} type="checkbox" label="Only show products in stock " />
            </Form.Group> */}

        </>

    )

}



export default SearchBar