const Logger        = require('logplease')
// Setup logging
const logger = Logger.create("Orbit.Index-Native")
Logger.setLogfile(path.join(orbitDataDir, '/debug.log'))
Logger.setLogLevel('DEBUG')
