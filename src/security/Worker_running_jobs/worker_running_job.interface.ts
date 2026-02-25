export interface IWorkerRunningJob {
    id: number
    worker_name: string
    job_name: string
    start_time: Date
    end_time: Date
    status: 'running' | 'completed' | 'failed' | 'pending'
    message?: string
    user_id: number
}

export interface IWorkerRunningJobNew extends Omit<IWorkerRunningJob, 'id'> {}
export interface IWorkerRunningJobUpdate extends Partial<IWorkerRunningJob> {}
