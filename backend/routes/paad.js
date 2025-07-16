const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock data based on the PartidaPAAD interface
let mockPaadData = [
  {
    id: uuidv4(),
    clavePresupuestal: '2212',
    areaRequirente: 'Nutrición y Dietética',
    descripcionBienServicio: 'Fórmulas lácteas para recién nacidos',
    cantidadEstimada: 1000,
    unidadMedida: 'Lata',
    costoUnitarioEstimado: 250,
    costoTotalEstimado: 250000,
    estatus: 'En Captura',
    fechaCreacion: new Date(),
  },
  {
    id: uuidv4(),
    clavePresupuestal: '3311',
    areaRequirente: 'Mantenimiento',
    descripcionBienServicio: 'Servicio de mantenimiento preventivo para equipo de Rayos X',
    cantidadEstimada: 12,
    unidadMedida: 'Servicio',
    costoUnitarioEstimado: 5000,
    costoTotalEstimado: 60000,
    estatus: 'Enviado a Finanzas',
    fechaCreacion: new Date(),
  },
];

// GET all partidas
router.get('/', (req, res) => {
  res.json(mockPaadData);
});

// GET a single partida by id
router.get('/:id', (req, res) => {
  const partida = mockPaadData.find(p => p.id === req.params.id);
  if (partida) {
    res.json(partida);
  } else {
    res.status(404).send('Partida no encontrada');
  }
});

// CREATE a new partida
router.post('/', (req, res) => {
  const newPartida = {
    id: uuidv4(),
    ...req.body,
    fechaCreacion: new Date(),
    costoTotalEstimado: req.body.cantidadEstimada * req.body.costoUnitarioEstimado,
    estatus: 'En Captura',
  };
  mockPaadData.push(newPartida);
  res.status(201).json(newPartida);
});

// UPDATE a partida
router.put('/:id', (req, res) => {
  const index = mockPaadData.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    mockPaadData[index] = { ...mockPaadData[index], ...req.body };
    // Recalculate total cost if necessary
    if (req.body.cantidadEstimada || req.body.costoUnitarioEstimado) {
        mockPaadData[index].costoTotalEstimado = mockPaadData[index].cantidadEstimada * mockPaadData[index].costoUnitarioEstimado;
    }
    res.json(mockPaadData[index]);
  } else {
    res.status(404).send('Partida no encontrada');
  }
});

// DELETE a partida
router.delete('/:id', (req, res) => {
  const index = mockPaadData.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    mockPaadData.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Partida no encontrada');
  }
});

module.exports = router;
