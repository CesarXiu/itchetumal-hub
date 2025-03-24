import express from 'express';
import { Router } from "express";
import iconController from "@/controllers/iconController";

const router = Router();

router.get('/download/:fileName', async (req, res) => {
    const { fileName } = req.params;
    const file = await iconController.show(fileName);
    //console.log(typeof file);
    if(file){
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
        // Pipa el flujo al cliente
        file.pipe(res);

        // Asegúrate de manejar errores en el flujo
        file.on('error', (err) => {
            console.error('Error en el flujo:', err);
            res.status(500).send('Error reading file');
        });

        // Finaliza la respuesta cuando el flujo termine
        file.on('end', () => {
            res.end();
        });
    }else{
        res.status(404).send('File not found');
    }
});
router.get('/view/:fileName', async (req, res) => {
    const { fileName } = req.params;

    try {
        const file = await iconController.show(fileName);

        if (file) {
            // Determinar el tipo de contenido basado en la extensión del archivo
            const extension = fileName.split('.').pop();
            const contentTypeMap: Record<string, string> = {
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'svg': 'image/svg+xml'
            };

            const contentType = contentTypeMap[extension || ''] || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);

            // Pipa el flujo al cliente
            file.pipe(res);

            // Manejar errores en el flujo
            file.on('error', (err) => {
                console.error('Error en el flujo:', err);
                if (!res.headersSent) {
                    res.status(500).send('Error reading file');
                }
            });
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error retrieving file:', error);
        if (!res.headersSent) {
            res.status(500).send('Error retrieving file');
        }
    }
});
router.post('/upload', express.raw({ type: 'image/*', limit: '10mb' }), async (req, res) => {
    const file = req.body;

    if(file){

        // Obtener la extensión desde Content-Type
        const contentType = req.headers['content-type']; // 'image/png'

        if (!contentType) {
                res.status(400).send('Missing Content-Type header');
        }

        // Lista de tipos permitidos
    const allowedTypes: Record<string, string> = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/svg+xml': 'svg'
    };

    const extension = allowedTypes[contentType as keyof typeof allowedTypes];
        if (!extension) {
                res.status(400).send('Invalid file type. Only PNG, JPG, and SVG are allowed.');
        }

        // Asignar un nombre único con la extensión correcta
        const name = `${Date.now()}.${extension}`;

        const result = await iconController.store(file, name);
        if(result){
            res.send('File uploaded');
        }else{
            res.status(500).send('Error uploading file');
        }
    }else{
        res.status(400).send('No file uploaded');
    }
});

export default router;