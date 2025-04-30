const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

async function register(req, res) {
  try {
    const { fisrtname, lastname, email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
      fisrtname,
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
    });
  } catch (error) {
    res.status(500).send({ msg: "Error al hacer login al usuario" });
  }
}

module.exports = {
  register,
  login,
};
