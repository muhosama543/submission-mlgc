const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
    });

    server.route({
        method: 'POST',
        path: '/predict',
        options: {
            payload: {
                maxBytes: 1000000,
                parse: true,
                output: 'stream',
            }
        },
        handler: async (request, h) => {
            const { payload } = request;

            if (payload.image.length > 1000000) {
                return h.response({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000'
                }).code(413);
            }

            // Mock prediction result
            const result = Math.random() > 0.5 ? 'Cancer' : 'Non-cancer';

            return {
                status: 'success',
                message: 'Model is predicted successfully',
                data: {
                    id: '77bd90fc-c126-4ceb-828d-f048dddff746',
                    result: result,
                    suggestion: result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Tetap jaga kesehatan!',
                    createdAt: new Date().toISOString()
                }
            };
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
