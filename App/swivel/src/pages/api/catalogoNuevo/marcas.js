const { Client } = require('@elastic/elasticsearch')

export default async function handler(req, res) {
    const client = new Client({ node: 'http://localhost:9200' });

    if (req.method !== 'GET') {
        res.status(400).json({ message: 'Method not allowed' });
    }

    try {
        let elasticResponse = await client.search({
            index: 'autos',
            body: {},
        }, { meta: true });

        let result = elasticResponse.body.hits.hits;

        let marcas = [...new Set(result.map(item => item._source.marca))];

        return res
            .status(200)
            .json({
                message: 'Marcas recuperadas exitosamente',
                result: marcas,
            });

    } catch (err) {
        return res.status(400).json({ message: 'Error al buscar autos', error: err.message });
    }
}