import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import "../assets/Pages.css"
import api from "../API/ST_API.js"
import { useAuth } from "../API/Auth";
import { useNavigate } from 'react-router-dom'

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchText, setSearchText] = useState("")
    const [error, setError] = useState('')

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
  

    const getAllPosts = async () => {
        try {
            const response = await api.getPosts();
            const postsData = response.data.posts
            setPosts(postsData);
            setFilteredPosts(postsData)
        } catch (error) {
                console.error('Error fetching posts:', error);
                setError("Failed to fetch user posts.")
            }
    };

    useEffect(() => {
       getAllPosts();
    }, []);

    useEffect(() => {
        const lowercasedSearchText = searchText.toLowerCase()
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(lowercasedSearchText) || 
            post.description.toLowerCase().includes(lowercasedSearchText) ||
            post.author.username.toLowerCase().includes(lowercasedSearchText))
        setFilteredPosts(filtered)  
    }, [searchText, posts])

    const handleSearchChange = (searchText) => {
        setSearchText(searchText)
    }

    const navigateToPostDetail = (postId) => {
        navigate(`/posts/${postId}`)
    }

    const navigateToMessageForm = (post) => {
        navigate(`/posts/${post._id}/messages`, { state: { post } })
    }

    return (
        <div className="posts-container">
            <div className="post-header">
                <SearchBar onSearch={handleSearchChange} />
                <h1 className="posts-title" >Posts</h1>
                { isLoggedIn && (
                   <Link className="add-post" to="/AddPost">
                        Add New Post
                    </Link> 
                )}  
            </div>
            <div className="post-card-container">
            {error && <p className="error">{error}</p>}
                {filteredPosts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-description" >{post.description}</p>
                        <div className="post-details">
                            <p className="post-price">Price: ${post.price}</p>
                            <p className="post-location">Location: {post.location}</p>
                            <p className="post-user">Seller: {post.author.username} </p>
                            {post.isAuthor ? (
                                <button className="custom-button" onClick={() => navigateToPostDetail(post._id)}>View</button>
                            ) : (
                                <button className="custom-button" onClick={() => navigateToMessageForm(post)}>Send Message</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}