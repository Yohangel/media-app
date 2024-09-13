import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const allowedTextTypes = ['text/plain'];

  if (file.fieldname === 'file' && (allowedImageTypes.includes(file.mimetype) || allowedTextTypes.includes(file.mimetype))) {
    cb(null, true); 
  } else {
    req.fileValidationError = 'Invalid file type';
    cb(null, false); 
  }
};

const upload = multer({
  storage,
  fileFilter
});

export { upload };
