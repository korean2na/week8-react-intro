import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'

export default function BlogSingle() {
    const [post, setPost] = useState({})
    const { id, uid } = useParams()
    let idTag = id
    const navigate = useNavigate()
    const { loadPost } = useContext(DataContext)
    const { posts } = useContext(DataContext)


    /* 
    * Take the id from useParams.
    * Use the ID in a useEffect to fetch data
    * from our single post api endpoint:
    * https://chief-flat-goose.glitch.me/api/post/1 (where 1 is the id)
    * 
    * Use that to put post data on the page
    */

    useEffect(() => {
        async function handleLoadPost() {
            const data = await loadPost(id, uid)
            setPost(data)
        }

        handleLoadPost()
    }, [id])

    return(
        <div className="post">
            <Post post={post}/>
            {
                (id > 1) ?
                <button onClick={() => {
                    idTag--
                    navigate(`/blog/${idTag}`)
                }}>Previous Post</button>
                : <></>
            }
            {
                (id < posts.length) ?
                <button onClick={() => {
                    idTag++
                    navigate(`/blog/${idTag}`)
                }}>Next Post</button>
                : <></>
            }
        </div>
    )
}