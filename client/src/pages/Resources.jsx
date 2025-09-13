
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// // A simple loading spinner component
// const Spinner = () => (
//     <div className="flex justify-center items-center p-10">
//         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
//     </div>
// );

// // A component for a single resource card
// const ResourceCard = ({ resource }) => {
//     const getCategoryStyle = (category) => {
//         switch (category) {
//             case 'Article': return 'bg-blue-100 text-blue-800';
//             case 'Video': return 'bg-red-100 text-red-800';
//             case 'Audio': return 'bg-green-100 text-green-800';
//             case 'Guide': return 'bg-yellow-100 text-yellow-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
//             <div className="p-6">
//                 <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryStyle(resource.category)} mb-3`}>
//                     {resource.category}
//                 </span>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
//                 <p className="text-gray-600 mb-4">{resource.content.substring(0, 100)}...</p>
//                 <Link to={`/resources/${resource._id}`} className="font-semibold text-blue-600 hover:underline">
//                     Read More &rarr;
//                 </Link>
//             </div>
//         </div>
//     );
// };

// const Resources = () => {
//     const [resources, setResources] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/resources');
//                 setResources(res.data);
//             } catch (err) {
//                 setError('Failed to load resources. Please try again later.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchResources();
//     }, []);

//     if (loading) return <Spinner />;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     return (
//         <div className="container mx-auto">
//             <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Psychoeducational Hub</h1>
//             {resources.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {resources.map((resource) => (
//                         <ResourceCard key={resource._id} resource={resource} />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500">No resources available at the moment.</p>
//             )}
//         </div>
//     );
// };

// export default Resources;










// In Resources.jsx
import React, { useState, useEffect } from 'react';
// REMOVE: import axios from 'axios';
import { Link } from 'react-router-dom';
// ✅ ADD: Import your service function
import { getAllResources } from '../services/resourceService'; 

// ... (Spinner and ResourceCard components are fine)

 // A simple loading spinner component
const Spinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
);

// A component for a single resource card
const ResourceCard = ({ resource }) => {
    const getCategoryStyle = (category) => {
        switch (category) {
            case 'Article': return 'bg-blue-100 text-blue-800';
            case 'Video': return 'bg-red-100 text-red-800';
            case 'Audio': return 'bg-green-100 text-green-800';
            case 'Guide': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getCategoryStyle(resource.category)} mb-3`}>
                    {resource.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.content.substring(0, 100)}...</p>
                {
                   ( resource.category == 'Article' || resource.category == 'Guide' )&&(
                        <Link to={`/resources/${resource._id}`} className="font-semibold text-blue-600 hover:underline">
                    Read More &rarr;
                </Link>
                    )
                }
                {
                     resource.category !== 'Article' && resource.category !== 'Guide' && (
                         <Link to={`/resources/${resource._id}`} className="font-semibold text-blue-600 hover:underline">
              to play click here &rarr;
                </Link>
                     )
                
                }
                
            </div>
        </div>
    );
};



const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                // ✅ CHANGE THIS: Use the service function
                const res = await getAllResources();
                // Your API wraps data, so access res.data.data
                setResources(res.data.data); 
            } catch (err) {
                // ... error handling
                setError('Failed to load resources. Please try again later.');
                console.error(err);

            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

 if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mt-20 mb-10">Psychoeducational Hub</h1>
            {resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((resource) => (
                        <ResourceCard key={resource._id} resource={resource} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No resources available at the moment.</p>
            )}
        </div>
    );
};

export default Resources;



    // ... (rest of the component is fine)
//     return (
//       // ...
//     );
// };

// export default Resources;





















// // In src/pages/Resources.jsx

// import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // ⛔️ Remove this
// import { Link } from 'react-router-dom';
// import { getAllResources } from '../services/resourceService'; // ✅ Add this import

// // ... (Spinner and ResourceCard components can stay the same)

// const Resources = () => {
//     const [resources, setResources] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 // const res = await axios.get('http://localhost:5000/api/resources'); // ⛔️ Replace this line
//                 const res = await getAllResources(); // ✅ With this line
                
//                 // Your backend wraps the response, so access res.data.data
//                 setResources(res.data.data); 
//             } catch (err) {
//                 setError('Failed to load resources. Please try again later.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchResources();
//     }, []);

//     // ... (rest of the component is fine)
//     return (
//         // ...
//           <div className="container mx-auto">
//             <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Psychoeducational Hub</h1>
//             {resources.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {resources.map((resource) => (
//                         <ResourceCard key={resource._id} resource={resource} />
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-500">No resources available at the moment.</p>
//             )}
//         </div>
//     );
// };

// export default Resources;