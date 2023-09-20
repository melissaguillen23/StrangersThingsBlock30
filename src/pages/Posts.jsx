import React, { useEffect, useState } from "react";
import { fetchPosts } from "../API";
import SearchBar from "../components/SearchBar";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        async function fetchPostsData() {
            try {
                const data = await fetchPosts();
                setPosts(data.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPostsData();
    }, []);

    useEffect(() => {
       const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredPosts(filtered)  
    }, [searchText, posts])

    const handleSearchChange = (searchText) => {
        setSearchText(searchText)
       
    }

    return (
        <div>
            <h1>Posts</h1>
           <SearchBar onSearch={handleSearchChange} />

            {filteredPosts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>Price: ${post.price}</p>
                    <p>Location: {post.location}</p>
                    <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
                    <p>User: {post.author.username} </p>
                </div>
            ))}
        </div>
    )
}