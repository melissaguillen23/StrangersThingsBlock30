import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import "../assets/Pages.css"
import api from "../API/ST_API.js"
import { useAuth } from "../API/Auth";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchText, setSearchText] = useState("")
    const [error, setError] = useState('')

    const { isLoggedIn } = useAuth()
  

    const fetchPosts = async () => {
        try {
            const response = await api.getPosts();
            console.log('API response:', response.data)
            const postsData = response.data.posts
            setPosts(postsData);
            setFilteredPosts(postsData)
        } catch (error) {
                console.error('Error fetching posts:', error);
                setError("Failed to fetch user posts.")
            }
    };

    useEffect(() => {
       fetchPosts();
    }, []);

    useEffect(() => {
        const filteredPosts = posts.filter(post =>
            post.title.includes(searchText) || post.description.includes(searchText))
            setFilteredPosts(filteredPosts)  
    }, [searchText, posts])

    const handleSearchChange = (searchText) => {
        setSearchText(searchText)
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
                        <h2 className="post-title" >{post.title}</h2>
                        <p className="post-description" >{post.description}</p>
                        <div className="post-details">
                            <p className="post-price">Price: ${post.price}</p>
                            <p className="post-location">Location: {post.location}</p>
                            <p className="post-user">Seller: {post.author.username} </p>
                            <Link to={`/post/${post._id}`} className="view-details-button">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}