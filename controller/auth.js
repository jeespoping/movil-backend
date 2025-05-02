const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user",
      active: false,
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Usuario ya registrado" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error al registrar el usuario" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({ email: emailLowerCase });

    if (!user)
      return res.status(400).send({ msg: "Email o contraseña invalido" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).send({
      access: jwt.createAccessToken(user),
      refresh: jwt.createRefreshToken(user),
      user: user,
    });
  } catch (error) {
    res.status(500).send({ msg: "Error al hacer login al usuario" });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).send({ msg: "Token requerido" });

    const { user_id } = jwt.decode(token);

    const user = await User.findOne({ _id: user_id });

    if (!user) return res.status(400).send({ msg: "Usuario no encontrado" });

    res.status(200).send({
      accessToken: jwt.createAccessToken(user),
      refresh: jwt.createRefreshToken(user),
      user: user,
    });
  } catch (error) {
    res.status(500).send({ msg: "Error al refrescar el token" });
  }
}

async function getMe(req, res) {
  try {
    const { user_id } = req.user;

    const response = await User.findById(user_id);

    if (!response) {
      return res.status(400).send({ msg: "No se ha encontrado el usuario" });
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
  getMe,
};
