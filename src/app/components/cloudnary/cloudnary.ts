import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

// Configuration object with type safety
const cloudinaryConfig: ConfigOptions = {
  cloud_name: 'dhaumphvl', // Replace with your cloud name if different
  api_key: '223977999232774',
  api_secret: 'A386eCIQlD5V_XxCERgSzUGwdb4',
  secure: true
};

// Initialize Cloudinary with the configuration
cloudinary.config(cloudinaryConfig);

// Verify the configuration
console.log('Cloudinary configured with cloud name:', cloudinaryConfig.cloud_name);

export default cloudinary;

//  CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dhaumphvl