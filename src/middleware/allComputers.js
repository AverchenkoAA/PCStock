import {ComputersWorker} from '../db/dbWorkerComputers.js';

const pcWorker = new ComputersWorker();

export function getAllComputers(){
    return pcWorker.findAll();
}

