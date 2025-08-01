import { createClient } from '@supabase/supabase-js';
import multer from 'multer';

// Initialize Supabase client (lazy initialization)
let supabase = null;

const getSupabaseClient = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
};

// Configure multer for memory storage (we'll upload to Supabase directly)
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const supabaseStorage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Helper function to upload file to Supabase Storage
export const uploadToSupabase = async (file, folder = 'general') => {
  try {
    const supabase = getSupabaseClient();
    
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    const fileName = `${file.fieldname}-${uniqueSuffix}.${extension}`;
    const filePath = `${folder}/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('ghuroo-images') // Your storage bucket name
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('ghuroo-images')
      .getPublicUrl(filePath);

    return {
      path: data.path,
      publicUrl: urlData.publicUrl,
      fileName: fileName
    };
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
};

// Helper function to delete file from Supabase Storage
export const deleteFromSupabase = async (filePath) => {
  try {
    const supabase = getSupabaseClient();
    
    const { error } = await supabase.storage
      .from('ghuroo-images')
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting from Supabase:', error);
    throw error;
  }
};

export default supabaseStorage;
