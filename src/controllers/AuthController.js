const authService = require('../services/AuthService');

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await authService.registerUser(email, name, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ 
      error: error.message ,
    });
  }
};

const test = async (req, res) => {
  return res.json({ 
      "hello" : "world"
  });
}

module.exports = { register, login , test};