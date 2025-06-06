// __tests__/models/usuarioModel.test.js

jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  execute: jest.fn(),
  prepare: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

const db = require('../../src/config/db');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../../src/models/usuariosModel');

describe('UsuarioModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver todos los usuarios', async () => {
      const mockResult = [{ id: 1, nombre: 'Juan' }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await UsuarioModel.getAll();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM usuarios_with_details", expect.any(Function));
      expect(result).toBe(mockResult);
    });

    it('debería rechazar si hay error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error, null));

      await expect(UsuarioModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('getByEmail', () => {
    it('debería devolver el usuario encontrado por correo', async () => {
      const user = [{ id: 2, correo: 'test@test.com' }];
      db.execute.mockResolvedValue(user);

      const result = await UsuarioModel.getByEmail('test@test.com');

      expect(db.execute).toHaveBeenCalledWith("SELECT * FROM USUARIOS WHERE correo = ?", ['test@test.com']);
      expect(result).toBe(user[0]);
    });
  });

  describe('create', () => {
    it('debería crear un usuario con contraseña hasheada', async () => {
      const hashed = 'hashed-password';
      bcrypt.hash.mockResolvedValue(hashed);

      const statementMock = { exec: jest.fn((params, cb) => cb(null, { insertId: 5 })) };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const usuario = { nombre: 'Ana', correo: 'ana@test.com', contrasena: '1234', rol_id: 1 };
      const result = await UsuarioModel.create(usuario);

      expect(bcrypt.hash).toHaveBeenCalledWith('1234', 10);
      expect(db.prepare).toHaveBeenCalled();
      expect(statementMock.exec).toHaveBeenCalledWith(
        ['Ana', 'ana@test.com', hashed, 1],
        expect.any(Function)
      );
      expect(result).toEqual({ insertId: 5 });
    });

    it('debería rechazar si prepare falla', async () => {
      bcrypt.hash.mockResolvedValue('hashed');
      db.prepare.mockImplementation((q, cb) => cb(new Error('prepare error'), null));

      await expect(UsuarioModel.create({ nombre: 'x', correo: 'x', contrasena: 'x', rol_id: 1 })).rejects.toThrow('prepare error');
    });
  });

  describe('update', () => {
    it('debería actualizar usuario con nueva contraseña', async () => {
      bcrypt.hash.mockResolvedValue('hashed-pass');

      const statementMock = { exec: jest.fn((params, cb) => cb(null, { changes: 1 })) };
      db.prepare.mockImplementation((q, cb) => cb(null, statementMock));

      const result = await UsuarioModel.update({ id: 3, nombre: 'Mod', correo: 'mod@test.com', contrasena: 'newpass', rol_id: 2 });

      expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10);
      expect(db.prepare).toHaveBeenCalled();
      expect(statementMock.exec).toHaveBeenCalledWith(
        ['Mod', 'mod@test.com', 'hashed-pass', 2, 3],
        expect.any(Function)
      );
      expect(result).toEqual({ changes: 1 });
    });

    it('debería actualizar usuario sin cambiar contraseña', async () => {
      const statementMock = { exec: jest.fn((params, cb) => cb(null, { changes: 1 })) };
      db.prepare.mockImplementation((q, cb) => cb(null, statementMock));

      const result = await UsuarioModel.update({ id: 4, nombre: 'Mod2', correo: 'mod2@test.com', rol_id: 3 });

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(db.prepare).toHaveBeenCalled();
      expect(statementMock.exec).toHaveBeenCalledWith(
        ['Mod2', 'mod2@test.com', 3, 4],
        expect.any(Function)
      );
      expect(result).toEqual({ changes: 1 });
    });

    it('debería rechazar si prepare falla', async () => {
      db.prepare.mockImplementation((q, cb) => cb(new Error('prepare error'), null));

      await expect(UsuarioModel.update({ id: 1, nombre: 'x', correo: 'x', rol_id: 1 })).rejects.toThrow('prepare error');
    });
  });

  describe('delete', () => {
    it('debería eliminar usuario correctamente', async () => {
      const statementMock = { exec: jest.fn((params, cb) => cb(null, { changes: 1 })) };
      db.prepare.mockImplementation((q, cb) => cb(null, statementMock));

      const result = await UsuarioModel.delete(10);

      expect(db.prepare).toHaveBeenCalled();
      expect(statementMock.exec).toHaveBeenCalledWith([10], expect.any(Function));
      expect(result).toEqual({ changes: 1 });
    });

    it('debería rechazar si prepare falla', async () => {
      db.prepare.mockImplementation((q, cb) => cb(new Error('prepare error'), null));

      await expect(UsuarioModel.delete(10)).rejects.toThrow('prepare error');
    });
  });

  describe('getAllRoles', () => {
    it('debería devolver todas las roles', async () => {
      const roles = [{ id: 1, nombre: 'admin' }];
      db.exec.mockImplementation((query, cb) => cb(null, roles));

      const result = await UsuarioModel.getAllRoles();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Roles", expect.any(Function));
      expect(result).toBe(roles);
    });

    it('debería rechazar si hay error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error, null));

      await expect(UsuarioModel.getAllRoles()).rejects.toThrow('DB error');
    });
  });
});