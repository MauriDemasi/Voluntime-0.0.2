module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Insertar organizaciones
      console.log('Insertando organizaciones...');
      await queryInterface.sequelize.query(`
        INSERT INTO organizacion (name, description, email, phone, cuit, location, password, image, coverPage, urlWebSite, category, createdAt, updatedAt)
        VALUES
          ('Organización A', 'Descripción de la Organización A', 'contacto@org-a.com', '123456789', '20-12345678-9', 'Calle Ficticia 123, Ciudad X', 'hashed_password_1', '{"url": "imageA.jpg"}', '{"url": "coverA.jpg"}', 'https://www.org-a.com', 'Salud y discapacidad', NOW(), NOW()),
          ('Organización B', 'Descripción de la Organización B', 'contacto@org-b.com', '987654321', '20-98765432-1', 'Calle Ficticia 456, Ciudad Y', 'hashed_password_2', '{"url": "imageB.jpg"}', '{"url": "coverB.jpg"}', 'https://www.org-b.com', 'Medioambiente y fauna', NOW(), NOW());
      `, { transaction });

      // Insertar productos
      console.log('Insertando productos...');
      await queryInterface.sequelize.query(`
        INSERT INTO producto (name, image, costInHours, stock, deletedAt, createdAt, updatedAt)
        VALUES
          ('Producto A', '{"url": "productoA.jpg"}', 10, 100, NULL, NOW(), NOW()),
          ('Producto B', '{"url": "productoB.jpg"}', 20, 200, NULL, NOW(), NOW());
      `, { transaction });

      // Insertar usuarios
      console.log('Insertando usuarios...');
      await queryInterface.sequelize.query(`
        INSERT INTO usuario (fullName, phone, email, password, image, reputation, hoursAcc, rolesId, createdAt, updatedAt)
        VALUES
          ('Usuario A', '123456789', 'usuarioA@example.com', 'hashed_password_3', '{"url": "usuarioA.jpg"}', 5, 10, 1, NOW(), NOW()),
          ('Usuario B', '987654321', 'usuarioB@example.com', 'hashed_password_4', '{"url": "usuarioB.jpg"}', 8, 15, 2, NOW(), NOW());
      `, { transaction });

      // Insertar voluntariados
      console.log('Insertando voluntariados...');
      await queryInterface.sequelize.query(`
        INSERT INTO voluntariado (name, description, category, modeOfwork, workTime, vacancies, address, reward, organizationId, createdAt, updatedAt)
        VALUES
          ('Voluntariado A', 'Descripción del Voluntariado A', 'Salud y discapacidad', 'presencial', 'tiempo completo', 5, 'Calle X, Ciudad Z', 100, 1, NOW(), NOW()),
          ('Voluntariado B', 'Descripción del Voluntariado B', 'Medioambiente y fauna', 'remoto', 'tiempo parcial', 10, 'Calle Y, Ciudad W', 50, 2, NOW(), NOW());
      `, { transaction });

      await transaction.commit();
      console.log('Seeder ejecutado correctamente.');
    } catch (error) {
      await transaction.rollback();
      console.error('Error al ejecutar el seeder:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM voluntariado WHERE name IN ("Voluntariado A", "Voluntariado B")', { transaction });
      await queryInterface.sequelize.query('DELETE FROM usuario WHERE fullName IN ("Usuario A", "Usuario B")', { transaction });
      await queryInterface.sequelize.query('DELETE FROM producto WHERE name IN ("Producto A", "Producto B")', { transaction });
      await queryInterface.sequelize.query('DELETE FROM organizacion WHERE name IN ("Organización A", "Organización B")', { transaction });
      await transaction.commit();
      console.log('Datos eliminados correctamente.');
    } catch (error) {
      await transaction.rollback();
      console.error('Error al revertir el seeder:', error);
    }
  },
};
