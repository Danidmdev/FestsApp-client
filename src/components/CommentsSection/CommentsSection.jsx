import { useEffect, useState, useContext } from "react"
import { Button, Form, FormGroup, FormControl, Figure, FloatingLabel } from "react-bootstrap"
import { useParams } from "react-router-dom"
import commentsServices from './../../services/comments.services'
import { MessageContext } from "../../contexts/message.context"

import './CommentsSection.css'



const CommentsSection = ({ fest, loadFestData }) => {

    const { emitMessage } = useContext(MessageContext)

    const { fest_id } = useParams()
    const [comments, setComments] = useState(null)


    const [commentData, setCommentData] = useState({
        text: '',
    })

    useEffect(() => {
        loadData()
    }, [])


    const loadData = () => {

        commentsServices
            .getCommentByFest(fest_id)
            .then(({ data }) => {
                setComments(data)
                loadFestData()
            })
            .catch(err => console.error(err))
    }


    const handleInputChange = e => {
        const { value, name } = e.target
        setCommentData({ ...commentData, [name]: value })
    }

    const handleCommentSubmit = e => {
        e.preventDefault()
        commentsServices
            .getNewComment(fest_id, commentData)
            .then(() => {
                setCommentData({ text: "" })
                loadFestData()
                loadData()
                emitMessage('Comment created')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleleteComment = (comment_id) => {

        commentsServices
            .deleteComment(comment_id)
            .then(() => {
                loadData()
                emitMessage('Comment deleted')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="my-4">
            <h3>
                Comments
            </h3>
            <hr className="my-2" />

            <Form onSubmit={handleCommentSubmit} className="mt-3">
                <FormGroup controlId="formComment">
                    <FormControl
                        type="text"
                        name="text"
                        value={commentData.text}
                        onChange={handleInputChange}
                        placeholder="Type your comment"
                        required
                    />
                </FormGroup>
                {/* 
                    <Button className="mt-2" size="sm" variant="outline-dark" type="submit">
                        Post Comment
                    </Button> */}
            </Form>

            {comments && comments.length > 0 ? (
                <div className="Comments mt-4 ">
                    {comments.map((elm, index) => (
                        <div key={index} className="my-4">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <Figure.Image className="AvatarComment me-2 " variant="top" src={elm.owner.avatar} />
                                    <h6 className="fw-bold mb-2">{elm.owner.username}</h6>
                                    {/* <p className="Comment mb-2"> {elm.text}</p> */}
                                </div>

                                <div>
                                    <Button size="sm" variant="outline-danger" onClick={() => { deleleteComment(elm._id) }}>Delete</Button>
                                    {/* <small>
                                        {new Date(elm.createdAt).toLocaleDateString()} |
                                        {new Date(elm.createdAt).toLocaleTimeString()}
                                    </small> */}
                                </div>
                            </div >
                            <div className="d-flex justify-content-between w-100 border mt-1 rounded rounded-start rounded-bottom">
                                <p className="Comment m-2 ">{elm.text}</p>
                                <small className="m-2 text-muted">
                                    {new Date(elm.createdAt).toLocaleDateString()} |
                                    | {new Date(elm.createdAt).toLocaleTimeString()}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-muted">There are no comments yet.</p>
            )}
        </div>
    );
};

export default CommentsSection