import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/models/grupo.model.js', () => ({
  borrarEmpleado: jest.fn()
}));

const { borrarEmpleado } = await import('../src/controllers/grupo.controladores.js');
const model = await import('../src/models/grupo.model.js');

describe('Prueba: borrar empleado', () => {

  test('Debe eliminar un empleado existente (64)', async () => {

    const req = {
      params: { id: 64 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    model.borrarEmpleado.mockResolvedValue({
      affectedRows: 1
    });

    await borrarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Empleado eliminado correctamente",
      id: 5
    });

  });


  test('Debe retornar 404 si el empleado no existe', async () => {

    const req = {
      params: { id: 999 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    model.borrarEmpleado.mockResolvedValue({
      affectedRows: 0
    });

    await borrarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Empleado no encontrado"
    });

  });

  test('Debe retornar 400 si no se envía el id', async () => {

    const req = {
      params: {}
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await borrarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "El id del empleado es obligatorio"
    });

  });

  test('Debe retornar 500 si ocurre un error', async () => {

    const req = {
      params: { id: 5 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    model.borrarEmpleado.mockRejectedValue(new Error("Error DB"));

    await borrarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

});