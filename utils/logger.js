import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint } = format;

export default logger = createLogger({
  format: combine(label({ label: "right meow!" }), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});
