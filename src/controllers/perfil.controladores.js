import * as perfilModelo from '../models/perfil.model.js';
import bcrypt from 'bcryptjs';
import * as validar from '../utils/validaciones.js';

// Controlador para OBTENER el perfil
export const obtenerPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validar.esEnteroPositivo(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const perfil = await perfilModelo.obtenerPerfil(id);

    if (!perfil) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para ACTUALIZAR el perfil
export const actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { correo, telefono, contrasena } = req.body;

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: "El id del empleado es obligatorio" });
    }

    if (!validar.esCorreoValido(correo) || !validar.esTelefonoValido(telefono)) {
      return res.status(400).json({ message: "Correo y teléfono son obligatorios y válidos" });
    }

    // Manejo de la contraseña con BCRYPT
    let passwordHash = null;
    if (contrasena && contrasena.trim() !== "") {
      if (!validar.esContrasenaValida(contrasena)) {
        return res.status(400).json({ message: "Contraseña inválida" });
      }
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(contrasena, salt);
    }

    const perfilActualizado = await perfilModelo.actualizarPerfil({
      id,
      correo,
      telefono,
      contrasena: passwordHash, // Pasamos la contraseña ya encriptada (o null)
    });

    if (perfilActualizado.affectedRows === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};