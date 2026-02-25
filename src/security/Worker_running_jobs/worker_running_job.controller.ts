import Controller from '../../system/controller'
import WorkerRunningJobModel from './worker_running_job.model'
import { IWorkerRunningJob, IWorkerRunningJobNew, IWorkerRunningJobUpdate } from './worker_running_job.interface'

export default class WorkerRunningJobController extends Controller<IWorkerRunningJob, IWorkerRunningJobNew, IWorkerRunningJobUpdate> {
    model: WorkerRunningJobModel

    constructor() {
        super()
        this.model = new WorkerRunningJobModel()
    }
}
