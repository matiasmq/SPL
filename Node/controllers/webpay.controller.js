const axios = require('axios');

const iniciarTransaccion = async (req, res) => {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    const endpoint = 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions';
    const headers = {
        'Tbk-Api-Key-Id': '597055555532', // Reemplaza con tu códigoo de comercio
        'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
        'Content-Type': 'application/json'
    };
    const data = {
        buy_order: buyOrder,
        session_id: sessionId,
        amount,
        return_url: returnUrl
    };

    try {
        const response = await axios.post(endpoint, data, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    iniciarTransaccion
};
