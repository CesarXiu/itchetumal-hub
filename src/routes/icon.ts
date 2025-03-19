import { Router } from "express";
import iconController from "@/controllers/iconController";

const router = Router();

router.get('/download/:fileName', async (req, res) => {
    const { fileName } = req.params;
    const file = await iconController.show(fileName);

    if(file){
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
        file.pipe(res);
    }
    res.status(404).send('File not found');

});

router.post('/upload', async (req, res) => {
    const file = req.body.file;
    if(file){
        const result = await iconController.store(file);
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
