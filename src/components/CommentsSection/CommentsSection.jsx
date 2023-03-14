import { Button, Form } from "react-bootstrap"

const CommentsSection = () => {

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formComments">
                <Form.Label>Comment</Form.Label>
                <Form.Control type="text" placeholder="Type your comment" />
            </Form.Group>
            <Button className="mb-5" variant="outline-dark" type="submit"> Send </Button>
        </Form>
    )
}

export default CommentsSection