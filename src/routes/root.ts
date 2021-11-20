import { FastifyPluginAsync } from "fastify"
const root: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, res) => {
    return { root: true }
  })
}
export default root
