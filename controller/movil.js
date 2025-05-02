const Movil = require("../models/movil");
const image = require("../utils/image");

async function createMovil(req, res) {
  const movil = new Movil(req.body);
  movil.create_at = new Date();

  const imagePath = image.getFilesPath(req.files.miniature);
  movil.miniature = imagePath;

  try {
    movil.save();
    res.status(200).send(movil);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al crear el movil" });
  }
}

async function getMoviles(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  try {
    const movil = await Movil.paginate({}, options);
    res.status(200).send(movil);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener los moviles" });
  }
}

async function getMovilSearch(req, res) {
  const { q } = req.query;

  const query = {
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  };

  try {
    const movil = await Movil.paginate(query, {});
    res.status(200).send(movil);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener los moviles" });
  }
}

async function updateMovil(req, res) {
  const { id } = req.params;
  const movilData = req.body;

  if (req?.files?.miniature) {
    const imagePath = image.getFilesPath(req.files.miniature);
    movilData.miniature = imagePath;
  }

  try {
    const movil = await Movil.findByIdAndUpdate({ _id: id }, movilData);

    res.status(200).send(movil);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error ala ctualizar el movil" });
  }
}

async function getMovil(req, res) {
  const { url } = req.params;

  try {
    const movil = await Movil.findOne({ url });

    if (!movil) {
      return res.status(400).send({ msg: "No se ha encontrado ningun movil" });
    }

    res.status(200).send(movil);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error en el servidor" });
  }
}

async function deleteMovil(req, res) {
  const { id } = req.params;

  try {
    await Movil.findByIdAndDelete(id);
    res.status(200).send({ msg: "Movil eliminado" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al eliminar el movil" });
  }
}

module.exports = {
  createMovil,
  getMoviles,
  updateMovil,
  getMovil,
  deleteMovil,
  getMovilSearch,
};
