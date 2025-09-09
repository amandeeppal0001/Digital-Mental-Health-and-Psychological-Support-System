import Resource from '../models/Resources.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, uploadPdfOnCloudinary} from '../utils/cloudinary.js';
import fs from 'fs';
/**
 * @desc    Get all resources
 * @route   GET /api/resources
 * @access  Public
 */
export const getAllResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, resources, "Resources fetched successfully."));
});

/**
 * @desc    Get a single resource by ID
 * @route   GET /api/resources/:id
 * @access  Public
 */
export const getResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
        throw new ApiError(404, "Resource not found.");
    }

    res.status(200).json(new ApiResponse(200, resource, "Resource fetched successfully."));
});

/**
 * @desc    Create a new resource
 * @route   POST /api/resources
 * @access  Private (Admin/Counselor)
 */

export const createResource = asyncHandler(async (req, res) => {
    // Destructure all possible fields from the request body
    const { title, content, category, url } = req.body;

    // Basic validation for common fields
    if (!title || !content || !category) {
        throw new ApiError(400, "Title, content, and category are required.");
    }

    const resourceData = {
        title,
        content,
        category,
        author: req.user._id, // Comes from authMiddleware
    };

    // Handle different categories
    if (category === 'Video' || category === 'Audio' ) {
        // These categories require a file upload
        if (!req.file) {
            throw new ApiError(400, `A file is required for the ${category} category.`);
        }
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
            throw new ApiError(500, "Error uploading file to Cloudinary.");
        }
        resourceData.url = cloudinaryResponse.secure_url;

    } else if (category === 'Article') {
        // This category requires a URL from the body
        if (!url) {
            throw new ApiError(400, "A URL is required for the Article category.");
        }
        resourceData.url = url;
    }
    else{
          if (!req.file) {
            throw new ApiError(400, `A file is required for the ${category} category.`);
        }
        const cloudinaryResponse = await uploadPdfOnCloudinary(req.file.path);
        if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
            throw new ApiError(500, "Error uploading file to Cloudinary.");
        }
        resourceData.url = cloudinaryResponse.secure_url;

    }
    // For the 'Article' category, no additional 'url' or file is needed.

    // Create the new resource in the database
    const newResource = await Resource.create(resourceData);

    if (!newResource) {
        throw new ApiError(500, "Something went wrong while creating the resource.");
    }

    res.status(201).json(new ApiResponse(201, newResource, "Resource created successfully."));
});




// export const createResource = asyncHandler(async (req, res) => {
//     const { title, content, category } = req.body;
//     // console.log("req.body:", req.body);
//     if (!title || !content || !category) {
//         throw new ApiError(400, "Title, content, and category are required.");
//     }
        
//     let cloudinaryResponse = null;

//     if (req.file) {
//         cloudinaryResponse = await uploadOnCloudinary(req.file.path); // Upload to Cloudinary
//         console.log(cloudinaryResponse);   
//     const newResource = await Resource.create({
//         title,
//         content,
//         category,
//         url: cloudinaryResponse?.secure_url || null,
//         author: req.user._id, // Comes from authMiddleware
//     });
//     }
//     else if(req.file == 'Guide'){
//             const newResource = await Resource.create({
//         title,
//         content,
//         category,
//         url: file || null,
//         author: req.user._id, // Comes from authMiddleware
//     })
// }

    

//     res.status(201).json(new ApiResponse(201, newResource, "Resource created successfully."));
// });














// import Resource from '../models/Resource.js';

// // @desc    Get all resources
// // @route   GET /api/resources
// // @access  Public
// export const getAllResources = async (req, res) => {
//   try {
//     const resources = await Resource.find().sort({ createdAt: -1 });
//     res.json(resources);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// // @desc    Get a single resource by ID
// // @route   GET /api/resources/:id
// // @access  Public
// export const getResourceById = async (req, res) => {
//     try {
//         const resource = await Resource.findById(req.params.id);
//         if (!resource) {
//             return res.status(404).json({ msg: 'Resource not found' });
//         }
//         res.json(resource);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind === 'ObjectId') {
//              return res.status(404).json({ msg: 'Resource not found' });
//         }
//         res.status(500).send('Server Error');
//     }
// };


// // @desc    Create a new resource
// // @route   POST /api/resources
// // @access  Private (Admin/Counselor)
// export const createResource = async (req, res) => {
//   const { title, content, category, url } = req.body;

//   try {
//     // req.user.id is available from the authMiddleware
//     const newResource = new Resource({
//       title,
//       content,
//       category,
//       url,
//       author: req.user.id,
//     });

//     const resource = await newResource.save();
//     res.json(resource);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
