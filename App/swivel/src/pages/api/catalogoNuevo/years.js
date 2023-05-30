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

        let años = [...new Set(result.map(item => item._source.año))];

        return res
            .status(200)
            .json({
                message: 'Años recuperados exitosamente',
                result: años,
            });

    } catch (err) {
        return res.status(400).json({ message: 'Error al buscar autos', error: err.message });
    }
}