import { spawn, Worker, Pool } from 'threads'

type WorkerPoolCollection = {
    WORKER_EMPLOYEES_SF: any
    WORKER_EMPLOYEES_CALCULATE_BONUS: any
}

class WorkerPool {
    workerPoolCollection!: WorkerPoolCollection
    // defaultWorkerPoolName = 'WORKER_DATA_PROCESSING'
    constructor() {
        this.initWorkers()
    }

    async initWorkers() {
        this.workerPoolCollection = {
            // WORKER_DATA_PROCESSING: Pool(() => spawn(new Worker('./data_processing.worker')), 1),
            WORKER_EMPLOYEES_SF: Pool(() => spawn(new Worker('./sync_employees_sf.worker')), 1),
            WORKER_EMPLOYEES_CALCULATE_BONUS: Pool(() => spawn(new Worker('./calculate_bono_employees.worker')), 1),
        }
    }

    async getWorkerPool(workerPoolName: keyof WorkerPoolCollection) {
        try {
            if (!workerPoolName || !this.workerPoolCollection[workerPoolName]) throw new Error('Worker pool name is required or not found')
            return this.workerPoolCollection[workerPoolName]
        } catch (err) {
            console.error(err)
        }
    }

    async killWorkerPool(workerPoolName: keyof WorkerPoolCollection) {
        try {
            if (!workerPoolName || !this.workerPoolCollection[workerPoolName]) throw new Error('Worker pool name is required or not found')
            await this.workerPoolCollection[workerPoolName].terminate()
        } catch (err) {
            console.error(err)
        }
    }
}

export const workerPool = new WorkerPool()
