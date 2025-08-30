import { v2 as cloudinary } from 'cloudinary'
const CLOUDINARY_CLOUD_NAME= 'dlcxg0eyg';
const CLOUDINARY_API_KEY= '923514299538129';
const CLOUDINARY_API_SECRET= '0lMprQc466Z10rEb-DQlm6nsOFg';

cloudinary.config(
    {
        cloud_name: CLOUDINARY_CLOUD_NAME, // who you are
        api_key: CLOUDINARY_API_KEY,       // public id for auth
        api_secret:CLOUDINARY_API_SECRET, // secret for signed actions
        secure: true,                                   // always use https urls
    }
)

export default cloudinary

