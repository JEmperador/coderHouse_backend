export const loggerTest = (req, res) => {
  req.logger.debug("Debug message");
  req.logger.http("HTTP message");
  req.logger.info("Info message");
  req.logger.warn("Warning message");
  req.logger.error("Error message");
  req.logger.fatal("Fatal message");

  res.status(200).json("Generated logs");
};
