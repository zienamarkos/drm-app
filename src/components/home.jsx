import {React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Button = () => {
    return (
        <button
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
        >
            access contents
        </button>
    );
};

function Home(){

    // State for the form data and messages
    const [author, setAuthor] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    // API endpoint for file upload
    const apiEndpoint = 'http://localhost:5000/api/upload';

     // Handle form submission
     const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to hold the file and metadata
        const formData = new FormData();
        
        formData.append('author', author);
        formData.append('file', file);
        formData.append('title', title);
        formData.append('type', type);


        try {
            // Send a POST request to the API endpoint
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: formData,
            });

            // Check if the response is successful
            if (response.ok) {
                const result = await response.json();
                setMessage(`File uploaded successfully: ${result.file.title}`);
                navigate('/contents');
            } else {
                // If response is not successful, throw an error
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            // Handle any errors
            setMessage(`Error uploading file: ${error.message}`);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

return(
    <div class="flex justify-center items-center h-64">
        <h1>home!</h1>
        <Link to='/contents'><Button/></Link>

        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Upload File</h2>

            {/* Display message */}
            {message && <div className="mb-4 text-lg">{message}</div>}

            {/* File upload form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">

                {/* File input */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="p-2 border rounded"
                    required
                />

                {/* content author's name input */}
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author's name"
                    className="p-2 border rounded"
                    required
                />


                {/* Title input */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    className="p-2 border rounded"
                    required
                />

                {/* Type input */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-2 border rounded"
                    required
                >
                    <option value="">Select type</option>
                    <option value="ebook">Ebook</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                </select>

                {/* Submit button */}
                <button
                    type="submit"
                    className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150"
                >
                    Upload
                </button>
            </form>
        </div>

    </div>


)
}

export default Home;