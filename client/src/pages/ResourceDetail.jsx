import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceById } from '../services/resourceService';

const Spinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
);

const ResourceDetail = () => {
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { resourceId } = useParams();

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await getResourceById(resourceId);
                setResource(res.data.data);
            } catch (err) {
                setError('Could not find the requested resource.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (resourceId) {
            fetchResource();
        }
    }, [resourceId]);

    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;

    return (
        <div className="bg-white max-w-4xl mx-auto mt-20 p-8 rounded-lg shadow-lg">
            {resource ? (
                <>
                    <Link to="/resources" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Resources</Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
                    <span className="text-sm semi-bold text-gray-500 mb-6 block">Category: {resource.category}</span>

                    {/* Media Player Section (Video/Audio) */}
                    {resource.url && (
                        <>
                            {resource.category === 'Video' && (
                                <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                                    <video controls className="w-full aspect-video">
                                        <source src={resource.url} type="video/mp4" />
                                    </video>
                                </div>
                            )}
                            {resource.category === 'Audio' && (
                                <div className="my-6">
                                    <audio controls className="w-full">
                                        <source src={resource.url} type="audio/mpeg" />
                                    </audio>
                                </div>
                            )}
                        </>
                    )}

                    {/* ✅ START: New PDF Viewer and Guide Link Section */}
                    {resource.category === 'Guide' && resource.url && (
                        //TO VIEW PDF IN YOUR OWN WEBSITE
                        // <div className="my-6 border rounded-lg overflow-hidden">
                        //     <iframe
                        //         src={resource.url}
                        //         title={resource.title}
                        //         className="w-full h-[80vh]" // Sets height to 80% of the viewport height   
                        //         frameBorder="0"
                        //     >
                        //         This browser does not support PDFs. Please download the PDF to view it: <a href={resource.url}>Download PDF</a>
                        //     </iframe>
                        // </div>

                         <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-blue-800">External Guide</h3>
                            <p className="text-blue-700 mb-3">This resource is an external guide. Click the link below to open it in a new tab.</p>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 break-words">
                                Open Guide &rarr;
                            </a>
                        </div>
                    )}
                    
                    
                    {resource.category === 'Article' && resource.url && (
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-blue-800">External Guide</h3>
                            <p className="text-blue-700 mb-3">This resource is an external guide. Click the link below to open it in a new tab.</p>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 break-words">
                                Open Guide &rarr;
                            </a>
                        </div>
                    )}
                    {/* ✅ END: New Section */}

                    <div className="prose lg:prose-xl max-w-none text-gray-700 mt-6">
                       <p>{resource.content}</p>
                    </div>
                </>
            ) : (
                <p>Resource not found.</p>
            )}
        </div>
    );
};

export default ResourceDetail;




































































// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import axios from 'axios';

// // // A simple loading spinner component
// // const Spinner = () => (
// //     <div className="flex justify-center items-center p-10">
// //         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
// //     </div>
// // );

// // const ResourceDetail = () => {
// //     const [resource, setResource] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const { id } = useParams(); // Get the resource ID from the URL

// //     useEffect(() => {
// //         const fetchResource = async () => {
// //             try {
// //                 const res = await axios.get(`http://localhost:5000/api/resources/${id}`);
// //                 setResource(res.data);
// //             } catch (err) {
// //                 setError('Could not find the requested resource.');
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchResource();
// //     }, [id]);

// //     if (loading) return <Spinner />;
// //     if (error) return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;

// //     return (
// //         <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
// //             {resource ? (
// //                 <>
// //                     <Link to="/resources" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Resources</Link>
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
// //                     <span className="text-sm text-gray-500 mb-6 block">Category: {resource.category}</span>
// //                     <div className="prose lg:prose-xl max-w-none text-gray-700">
// //                        <p>{resource.content}</p>
// //                     </div>
// //                     {resource.url && (
// //                         <div className="mt-8">
// //                            <h3 className="text-2xl font-semibold mb-2">External Link:</h3>
// //                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-words">
// //                                {resource.url}
// //                            </a>
// //                         </div>
// //                     )}
// //                 </>
// //             ) : (
// //                 <p>Resource not found.</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default ResourceDetail;


















// // In ResourceDetails.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// // REMOVE: import axios from 'axios';
// // ✅ ADD: Import your service function
// import { getResourceById } from '../services/resourceService';

// // ... (Spinner component is fine)
// // A simple loading spinner component
// const Spinner = () => (
//     <div className="flex justify-center items-center p-10">
//         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
//     </div>
// );

// const ResourceDetail = () => {
//     const [resource, setResource] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     // const { id } = useParams();
//         const { resourceId } = useParams();

//     useEffect(() => {
//         const fetchResource = async () => {
//             try {
//                 // ✅ CHANGE THIS: Use the service function
//                 const res = await getResourceById(resourceId);
//                  // Your API wraps data, so access res.data.data
//                 setResource(res.data.data);
//             } catch (err) {
//                 // ... error handling
//                  setError('Could not find the requested resource.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if(resourceId){
//             fetchResource();
//         }
        
//     }, [resourceId]);



// if (loading) return <Spinner />;
//     if (error) return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;

//     return (
//         <div className="bg-white max-w-4xl mx-auto mt-20 p-8 rounded-lg shadow-lg">
//             {resource ? (
//                 <>
//                     <Link to="/resources" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Resources</Link>
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
//                     <span className="text-sm semi-bold text-gray-500 mb-6 block">Category: {resource.category}</span>
//                 {resource.url && (
//                         <>
//                             {resource.category === 'Video' && (
//                                 <div className="my-6 rounded-lg overflow-hidden shadow-lg">
//                                     <video controls className="w-full aspect-video">
//                                         <source src={resource.url} type="video/mp4" />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 </div>
//                             )}

//                             {resource.category === 'Audio' && (
//                                 <div className="my-6">
//                                     <audio controls className="w-full">
//                                         <source src={resource.url} type="audio/mpeg" />
//                                         Your browser does not support the audio element.
//                                     </audio>
//                                 </div>
//                             )}
//                         </>
//                     )}






//                     <div className="prose lg:prose-xl max-w-none text-gray-700">
//                        <p>{resource.content}</p>
//                     </div>
//                     {/* {resource.url && (
//                         <div className="mt-8">
//                            <h3 className="text-2xl font-semibold mb-2">External Link:</h3>
//                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-words">
//                                {resource.url}
//                            </a>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <p>Resource not found.</p>
//             )} */}


//                                 {resource.url && resource.category !== 'Video' && resource.category !== 'Audio' && (
//                         <div className="mt-8">
//                             <h3 className="text-2xl font-semibold mb-2">External Link:</h3>
//                             <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-words">
//                                 {resource.url}
//                             </a>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <p>Resource not found.</p>
//             )}

//         </div>
//     );
// };

// export default ResourceDetail;








// //     // ... (rest of the component is fine)
// //     return (
// //       // ...
// //     );
// // };

// // export default ResourceDetail;































// // // In src/pages/ResourceDetail.jsx

// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // // import axios from 'axios'; // ⛔️ Remove this
// // import { getResourceById } from '../services/resourceService'; // ✅ Add this import

// // // ... (Spinner component can stay the same)
// // const Spinner = () => (
// //     <div className="flex justify-center items-center p-10">
// //         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
// //     </div>
// // );

// // const ResourceDetail = () => {
// //     const [resource, setResource] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');
// //     const { id } = useParams();

// //     useEffect(() => {
// //         const fetchResource = async () => {
// //             try {
// //                 // const res = await axios.get(`http://localhost:5000/api/resources/${id}`); // ⛔️ Replace this line
// //                 const res = await getResourceById(id); // ✅ With this line

// //                 // Your backend wraps the response, so access res.data.data
// //                 setResource(res.data.data);
// //             } catch (err) {
// //                 // ...
// //                 setError('Could not find the requested resource.');
// // //                 console.error(err);
// //             } finally {
// //                 // ...
// //                 setLoading(false);
// //             }
// //         };

// //         fetchResource();
// //     }, [id]);

// //     // ... (rest of the component is fine)
// //     return (
// //         // ...
// //         <div className="bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
// //             {resource ? (
// //                 <>
// //                     <Link to="/resources" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Resources</Link>
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
// //                     <span className="text-sm text-gray-500 mb-6 block">Category: {resource.category}</span>
// //                     <div className="prose lg:prose-xl max-w-none text-gray-700">
// //                        <p>{resource.content}</p>
// //                     </div>
// //                     {resource.url && (
// //                         <div className="mt-8">
// //                            <h3 className="text-2xl font-semibold mb-2">External Link:</h3>
// //                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-words">
// //                                {resource.url}
// //                            </a>
// //                         </div>
// //                     )}
// //                 </>
// //             ) : (
// //                 <p>Resource not found.</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default ResourceDetail;