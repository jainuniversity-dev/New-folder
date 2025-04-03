const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };
  
  const register = async (req, res) => {
    try {
      res.status(200).send({ message: "registration page" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export { home, register };
  