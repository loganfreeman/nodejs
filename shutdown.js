// Handle shutdown gracefully
const shutdown = () => {
  logger.info("Shutting down...")
  setTimeout(() => {
    logger.info("All done!")
    app.quit()
    process.exit(0)
  }, 1000)
}

app.on('window-all-closed', shutdown)
process.on('SIGINT', () => shutdown)
process.on('SIGTERM', () => shutdown)
