import * as grupoModelo from "../models/grupo.model.js";

export const obtenerEmpleados = async (req, res) => {
  try {
    const grupos = await grupoModelo.obtenerEmpleados();
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearEmpleado = async (req, res) => {
  try {
    const {
      nombre,
      apaterno,
      amaterno,
      correo,
      telefono,
      contrasena,
      tipo_usuario,
      departamento,
      puesto,
    } = req.body;

    // Validación básica
    if (
      !nombre ||
      !apaterno ||
      !amaterno ||
      !correo ||
      !telefono ||
      !contrasena ||
      !tipo_usuario ||
      !departamento ||
      !puesto
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }
    const nuevoEmpleado = await grupoModelo.crearEmpleado({
      nombre,
      apaterno,
      amaterno,
      correo,
      telefono,
      contrasena,
      tipo_usuario,
      departamento,
      puesto,
    });

    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apaterno,
      amaterno,
      correo,
      telefono,
      contrasena,
      tipo_usuario,
      departamento,
      puesto,
    } = req.body;

    // Validar ID
    if (!id) {
      return res.status(400).json({
        message: "El id del empleado es obligatorio",
      });
    }

    // Validación básica
    if (
      !nombre ||
      !apaterno ||
      !amaterno ||
      !correo ||
      !telefono ||
      !tipo_usuario ||
      !departamento ||
      !puesto
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios excepto la contraseña",
      });
    }

    const empleadoActualizado = await grupoModelo.actualizarEmpleado({
      id,
      nombre,
      apaterno,
      amaterno,
      correo,
      telefono,
      contrasena,
      tipo_usuario,
      departamento,
      puesto,
    });

    // Verificar si existe
    if (empleadoActualizado.affectedRows === 0) {
      return res.status(404).json({
        message: "Empleado no encontrado",
      });
    }

    res.status(200).json({
      message: "Empleado actualizado correctamente",
      data: empleadoActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import bcrypt from 'bcryptjs';

export const actualizarEmpleado1 = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apaterno, amaterno, correo, telefono, contrasena, tipo_usuario, departamento, puesto,
          } = req.body;

    // Convertir números una sola vez
    const idNum = Number(id);
    const tipoUsuarioNum = Number(tipo_usuario);
    const departamentoNum = Number(departamento);
    const puestoNum = Number(puesto);

    // Validar ID
    if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).json({
        message: "El id debe ser un número entero mayor a 0",
      });
    }

    // Validar campos obligatorios
    if (
      !nombre?.trim() ||
      !apaterno?.trim() ||
      !amaterno?.trim() ||
      !correo?.trim() ||
      !telefono?.trim() ||
      !Number.isInteger(tipoUsuarioNum) || tipoUsuarioNum <= 0 ||
      !Number.isInteger(departamentoNum) || departamentoNum <= 0 ||
      !Number.isInteger(puestoNum) || puestoNum <= 0
    ) {
      return res.status(400).json({
        message: "Datos obligatorios inválidos",
      });
    }

    // Validar formato correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correoLimpio = correo.trim();

    if (!emailRegex.test(correoLimpio)) {
      return res.status(400).json({
        message: "Formato de correo inválido",
      });
    }

    // Validar teléfono (solo números y +)
    const telefonoLimpio = telefono.trim();
    if (!/^[0-9+]+$/.test(telefonoLimpio) || telefonoLimpio.length < 10) {
      return res.status(400).json({
        message: "Teléfono inválido",
      });
    }

    // Crear objeto base
    const data = {
      id: idNum,
      nombre: nombre.trim(),
      apaterno: apaterno.trim(),
      amaterno: amaterno.trim(),
      correo: correoLimpio,
      telefono: telefonoLimpio,
      tipo_usuario: tipoUsuarioNum,
      departamento: departamentoNum,
      puesto: puestoNum,
    };

    // Validar y agregar contraseña si viene
    if (contrasena?.trim()) {
      if (contrasena.trim().length < 6) {
        return res.status(400).json({
          message: "La contraseña debe tener al menos 6 caracteres",
        });
      }
     const hash = await bcrypt.hash(contrasena.trim(), 10);
     data.contrasena = hash;
     // data.contrasena = contrasena.trim();
    }

    const empleadoActualizado = await grupoModelo.actualizarEmpleado(data);

    if (empleadoActualizado.affectedRows === 0) {
      return res.status(404).json({
        message: "Empleado no encontrado",
      });
    }

    res.status(200).json({
      message: "Empleado actualizado correctamente",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const borrarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    //  Validar ID
    if (!id) {
      return res.status(400).json({
        message: "El id del empleado es obligatorio",
      });
    }
    const resultado = await grupoModelo.borrarEmpleado({ id });
    // Verificar si existía
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: "Empleado no encontrado",
      });
    }
    res.status(200).json({
      message: "Empleado eliminado correctamente",
      id: resultado.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
