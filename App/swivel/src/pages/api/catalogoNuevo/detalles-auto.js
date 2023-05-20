/*

Sebastián González Villacorta	

14-05-2023

Description: Endpoint para obtener el detalle de un auto con su id
*/

// Connecting to ElasticSearch with security disabled
const { Client } = require('@elastic/elasticsearch')

export default async function CarDetails(req, res) {
    const client = new Client({ node: 'http://localhost:9200' });

    if (req.method !== 'GET') {
        res.status(400).json({ message: 'Method not allowed' });
    }

    let car_id = req.query.car_id;

    try {
        let elasticResponse = await client.get({
            index: 'autos',
            id: car_id
        }, { meta: true })
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        let result = elasticResponse.body._source;

        if (!result) {
            return res.status(500).json({ message: "Detalle de Auto no encontrado" });
        }

        return res
            .status(200)
            .json({
                message: "Detalles de Auto recuperados exitosamente",
                result: result
            });

    } catch (err) {
        return res.status(400).json({ message: "Error al obtener detalles de Auto", error: err.message });
    }



}