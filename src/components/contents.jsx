import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const DisplayContent = () => {

 
    const [files, setContents] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    
    
    // API endpoint for fetching the contents
    const apiEndpoint = 'https://drm-app-3.onrender.com/api/files';


    // Fetch items from the database when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                // Parse the JSON data
                const data = await response.json();
                
                // Update the state with the fetched data
                setContents(data);
            } catch (error) {
                // Handle any errors
                setError(`Error fetching contents: ${error.message}`);
            }
        
        };

        fetchData();
    }, []);

    


    // Handle changes in the search bar
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle changes in the category filter dropdown
    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    // Filter the contents based on the search term and category filter
    const filteredContents = files.filter((file) => {
        const matchesCategory = categoryFilter === 'all' || file.type === categoryFilter;
        const matchesSearchTerm = file.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
            || (file.author && file.author?.toLowerCase()?.includes(searchTerm.toLowerCase()))
            || (file.title && file.title?.toLowerCase()?.includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearchTerm;
    });

    

    return (
        <div >
            {/* Navbar */}
            <nav className="bg-gray-800 p-4"
            style={
                {   width:'100%',
                    position:'fixed'}
            }>

                <div className="container mx-auto flex items-center justify-between">
                    {/* Home link */}
                    <Link to="/home" className="text-white text-lg font-bold hover:text-gray-300 transition duration-150">
                        Home
                    </Link>

                    {/* Search filter */}
                    <div className="flex items-center space-x-4">
                        {/* Content category dropdown */}
                        
                        <select
                            value={categoryFilter}
                            onChange={handleCategoryChange}                
                            className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:bg-gray-600 transition duration-150"
                        >
                            <option value="all">All</option>
                            <option value="ebook">Ebook</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>

                        {/* Search bar */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                           
                            className="p-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:bg-gray-600 transition duration-150"
                        />
                    </div>
                </div>
            </nav>



            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Uploaded Contents</h2>

                {/* Display error if any */}
                {error && <div className="mb-4 text-red-500">{error}</div>}

                {/* Display the uploaded contents as cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {filteredContents.map((file) => (
                        
                        <div key={file.name} className="p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-150">
                            
                            {/* Display video, audio, or ebook */}
                            {file.type === 'audio' ? (
                                <audio controls className="w-full h-12 mb-2">
                                    <source src={`http://localhost:5000/${file.filePath}`} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            ) : file.type === 'ebook' ? (
                                <iframe
                                    
                                    src={`http://localhost:5000/${file.filePath}`}
                                    className="w-full h-64 mb-2 rounded-lg"
                                    title={file.name}
                                    style={{ border: 'none' }}
                                />
                               
                            ) : file.type === 'video' ? (
                            <video 
                                src={`http://localhost:5000/${file.filePath}`} 
                                controls
                                className="w-full h-64 mb-2 rounded-lg"
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height:'full',
                                    position: 'static'  // Reset the position to static
                                }}
                               
                            />


                            ) : null }

                            {/* Display content title */}
                            <h3 className="text-lg font-semibold mb-2">{file.name}</h3>

                            {/* Display content type */}
                            <p className="text-gray-600">Type: {file.type}</p>

                            {/* Display content author and title */}
                            {file.title && <p className="text-gray-600"><p  className="text-gray-600 font-bold">{file.author} </p> {file.title}</p>}

                            {/* Display posted date and time */}
                            {file.postedDate && (
                             <p className="text-gray-600 text-sm text-right mt-2">
                                {/* Format the date using date-fns, if desired */}
                                Posted on: {format(new Date(file.postedDate), 'dd MMM yyyy HH:mm')}
                             </p>
                        )}
                        </div>
                    ))}
                </div>
            </div>


           
        </div>
    );
};

export default DisplayContent;
