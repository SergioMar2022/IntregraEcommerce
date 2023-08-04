const multer = require('multer');
const User = require('../models/user');

// Configuración de multer para guardar archivos en carpetas diferentes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    if (file.fieldname === 'profileImage') {
      folder = 'profiles';
    } else if (file.fieldname === 'productImage') {
      folder = 'products';
    } else {
      folder = 'documents';
    }
    cb(null, `src/uploads/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Controlador para subir documentos
exports.uploadDocuments = upload.fields([
  { name: 'profileImage', maxCount: 1 }, // Para imagen de perfil
  { name: 'productImage', maxCount: 1 }, // Para imagen de producto
  { name: 'documents', maxCount: 10 }, // Para documentos, permite subir hasta 10 archivos
]), async (req, res, next) => {
  // Aquí puedes realizar acciones adicionales después de guardar los archivos
  // Por ejemplo, actualizar el usuario con la información de los documentos subidos
  // y el estado de haber subido algún documento particular, como se solicita en los aspectos adicionales.

  res.status(200).json({ message: 'Documentos subidos exitosamente' });
};

// Controlador para actualizar a premium
exports.updateToPremium = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const user = await User.findById(userId);

    // Verificar si se han cargado los documentos requeridos
    if (
      user.documents.some(doc => doc.name === 'Identificación') &&
      user.documents.some(doc => doc.name === 'Comprobante de domicilio') &&
      user.documents.some(doc => doc.name === 'Comprobante de estado de cuenta')
    ) {
      // Se han cargado los documentos, actualizar el usuario a premium
      user.isPremium = true;
      await user.save();
      res.status(200).json({ message: 'Usuario actualizado a premium correctamente' });
    } else {
      // No se han cargado todos los documentos requeridos
      res.status(400).json({ message: 'Debe cargar todos los documentos requeridos antes de pasar a premium' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};
