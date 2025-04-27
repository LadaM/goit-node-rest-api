import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import  User from '../../models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, '../../public/avatars');

export const updateAvatar = async (req, res) => {
  const { path: tempPath, filename } = req.file;
  const resultPath = path.join(avatarsDir, filename);

  await fs.rename(tempPath, resultPath);

  const avatarURL = `/avatars/${filename}`;

  await User.update(
    { avatarURL },
    { where: { id: req.user.id } }
  );

  res.status(200).json({ avatarURL });
};
