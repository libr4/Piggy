const notFoundMiddleware = (req, res) => res.status(404).send('Página não encontrada!')

export default notFoundMiddleware;