import { Response } from "express";
import { networkInterfaces } from "os";

export const badRequest = (res: Response, err: string) => 
    res.status(400).json({
        err
    })

export const notFound = (res: Response) => res.sendStatus(404);

export const ok = (res: Response) => res.sendStatus(200);

export const internalServerError = (res: Response, err: Error) => 
    res.status(500).json({
        err: err.message
    })

export const validateNumber = (num: any) => parseFloat(num) > 0


const nets: any = networkInterfaces();
export const results: any = {}

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
