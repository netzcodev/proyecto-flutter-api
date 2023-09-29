const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const pdf = require('pdfkit-construct');
const { formatDate } = require('../utils/helpers/date.helper');
const fs = require('fs');

class ServicesService {

  async create(data) {
    data.comingMileage = data.mileage + 10000;
    const obj = await models.Service.create(data);
    const vehicle = await models.Vehicle.findByPk(data.vehicleId);

    await vehicle.update({ mileage: data.mileage });
    const otherObj = await models.ScheduleService.create({
      scheduleId: data.scheduleId,
      serviceId: obj.dataValues.id,
    })

    if (!otherObj) {
      await models.Service.delete(obj.dataValues.id);
      throw "No se pudo crear";
    }

    return obj;
  }

  async find() {
    const response = await models.Service.findAll({
      include: ['serviceType']
    });
    return response;
  }

  async findHistory(id, limit, offset) {
    const sequelize = models.Service.sequelize;
    const query = `
    SELECT s.*
    FROM services s
    INNER JOIN schedule_service ss ON s.id = ss.service_id
    INNER JOIN schedules sch ON ss.schedule_id = sch.id
    WHERE sch.customer_id = :id
    ORDER BY created_at DESC
    LIMIT :limit
    OFFSET :offset
  `;

    try {
      const response = await sequelize.query(query, {
        replacements: { id, limit, offset },
        type: sequelize.QueryTypes.SELECT
      });
      return response;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
  }

  async findComingService(id) {
    const sequelize = models.Service.sequelize;
    const query = `
    SELECT s.*
    FROM services s
    INNER JOIN schedule_service ss ON s.id = ss.service_id
    INNER JOIN schedules sch ON ss.schedule_id = sch.id
    WHERE sch.customer_id = :id
    ORDER BY created_at DESC
    LIMIT 1
  `;

    try {
      const response = await sequelize.query(query, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
      });
      return response;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error}`);
    }
  }

  async findOne(id) {
    const obj = await models.Service.findByPk(id, {
      include: ['serviceType']
    });
    if (!obj) {
      throw boom.notFound('Service Not Found');
    }
    return obj;
  }

  async update(id, changes) {
    const obj = await this.findOne(id);
    const response = await obj.update(changes);
    return response;
  }

  async generatePdfReport(userId, fileName) {
    const sequelize = models.Service.sequelize;
    const doc = new pdf({
      bufferPages: true
    });

    const query = `
      SELECT
          ROW_NUMBER() OVER(ORDER BY s.created_at DESC) num,
          s.current_date date,
          s.name,
          s.description,
          v.plate vehicle,
          v.name || ' ' || COALESCE(v.manufacturer, '') vehicle_name
      FROM services s
      INNER JOIN schedule_service ss ON s.id = ss.service_id
      INNER JOIN schedules sch ON ss.schedule_id = sch.id
      INNER JOIN vehicles v ON s.vehicle_id = v.id
      WHERE sch.customer_id = :id
      ORDER BY num ASC
    `;

    const cliente = await models.People.findByPk(userId);

    // doc.on('data', (data) => { stream.write(data) });
    // doc.on('end', () => { stream.end() });

    let servicios = await sequelize.query(query, {
      replacements: { id: userId },
      type: sequelize.QueryTypes.SELECT
    });

    servicios = servicios.map((element) => {
      return {
        ...element,
        date: formatDate(Date.parse(element.date)),
      }
    });

    doc.setDocumentHeader({
      height: '20%',
    }, () => {

      doc.lineJoin('miter')
        .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

      doc.fill("#000").fontSize(15).text('Reporte General', {
        width: 420,
        align: 'center'
      })

      doc.fontSize(12);

      doc.text(`Documento: ${cliente.document}`, {
        width: 420,
        align: 'left'
      })
      doc.text(`Nombre: ${cliente.name} ${cliente.lastName ? cliente.lastName : ''}`, {
        width: 420,
        align: 'left'
      })
      doc.text(`Email: ${cliente.email}`, {
        width: 420,
        align: 'left'
      })
    });

    doc.addTable(
      [
        { key: 'num', label: 'No.', align: 'left' },
        { key: 'name', label: 'Nombre', align: 'left' },
        { key: 'date', label: 'Fecha', align: 'left' },
        { key: 'description', label: 'Descripción', align: 'left' },
        { key: 'vehicle', label: 'Placa', align: 'center' },
        { key: 'vehicle_name', label: 'Vehículo', align: 'left' },
      ],
      servicios,
      {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d3d3d3"],
        headBackground: '#7E57C2',
        cellsPadding: 10,
        marginLeft: 25,
        marginRight: 25,
        headAlign: 'center',
        headColor: '#fff'
      }
    );

    doc.render();
    doc.setPageNumbers((p, c) => `Página ${p} de ${c}`, "bottom left");
    doc.pipe(fs.WriteStream(`./tmpData/${fileName}.pdf`));
    doc.end();


  }

  async delete(id) {
    const obj = await this.findOne(id);
    await obj.destroy(id);
    return { id };
  }

}

module.exports = ServicesService;
