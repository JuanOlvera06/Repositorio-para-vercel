import { jest } from '@jest/globals';

// Mock del modelo
jest.unstable_mockModule('../src/models/ubicaciones.model.js', () => ({
  createUbicacion: jest.fn()
}));

// Importaciones después del mock
const { crearubicacion } = await import('../src/controllers/ubicaciones.controladores.js');
const model = await import('../src/models/ubicaciones.model.js');

describe('Prueba: crear ubicación', () => {

  test('Debe crear una ubicación correctamente (201)', async () => {

    const req = {
      body: { nombre: "Bodega 1" }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    model.createUbicacion.mockResolvedValue(1);

    await crearubicacion(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Ubicación creada correctamente",
      id: 1
    });

  });

  test('Debe retornar error si falla la creación (500)', async () => {

    const req = {
      body: { nombre: "Bodega 1" }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    model.createUbicacion.mockRejectedValue(new Error("Error DB"));

    await crearubicacion(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al crear ubicación"
    });

  });

});