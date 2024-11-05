const Router = (server) => {
  // Home route with the GET method and a handler
  server.get("/", (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to our API homepage!",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: `Internal Server Error ${err}`,
      });
    }
  });
};

export default Router;
