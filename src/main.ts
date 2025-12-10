import api from ".";

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'http://localhost'

api.listen(PORT, () => {
  console.log(`
    API iniciada em: ${HOST}:${PORT}
    Pressione CTRL+C para sair.
  `)
})

