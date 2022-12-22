import { useState, useEffect, createContext, useContext, useTransition } from "react";
import { getFirestore, collection, getDocs, doc, getDoc, Timestamp, addDoc, query, orderBy, limit, setDoc, collectionGroup } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = function (props) {
    const db = getFirestore()
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        async function getPosts() {
            // const response = await fetch(`https://chief-flat-goose.glitch.me/api/posts
            // `)
            // const data = await response.json()
            // setPosts(data)
        
            // const querySnapshot = await getDocs(collection(db, 'posts'))
            // const q = query(collectionGroup(db, 'posts'), orderBy('date_created', 'desc'))
            const q = query(collectionGroup(db, 'posts'))
            const querySnapshot = await getDocs(q)
            const postDocs = []

            querySnapshot.forEach(async (doc) => {

                const userData = await getDoc(doc.ref.parent.parent)
                const username = userData.data().username

                postDocs.push({
                    id: doc.id,
                    uid: userData.id,
                    username: username,
                    ...doc.data()
                })

                setPosts(postDocs)
            })
        }

        getPosts()
    }, [])

    async function loadPost(id, uid) {
        // const response = await fetch(`https://chief-flat-goose.glitch.me/api/post/${id}
        //     `)
        // const data = await response.json()
        // return data
        const docRef = doc(db, 'users', uid, 'posts', id)
        const docSnap = await getDoc(docRef)

        const userData = await getDoc(docSnap.ref.parent.parent)
        const username = userData.data().username

        if (docSnap.exists()) {
            return{
                id: docSnap.id,
                uid: uid,
                username: username,
                ...docSnap.data()
            }
        } else {
            console.log(`Post with id ${id} does not exist.`)
        }
    }

    async function addPost(title, body) {
        const newPost = {
            title: title,
            body: body,
            date_created: Timestamp.now()
        }

        const userDoc = await setDoc(doc(db, 'users', user.uid), {
            username: user.username
        })

        const postDoc = await addDoc(collection(db, 'users', user.uid, 'posts'), newPost)

        newPost.id = postDoc.id

        setPosts([newPost, ...posts])
    }

    async function fetchPokemon(parameter) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parameter}`)
        const data = await response.json()
        return data
    }

    const value = {
        posts,
        loadPost,
        addPost,
        fetchPokemon
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}