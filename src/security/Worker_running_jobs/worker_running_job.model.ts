import { Knex } from 'knex'
import Model from '../../system/model'
import { IWorkerRunningJob, IWorkerRunningJobNew, IWorkerRunningJobUpdate } from './worker_running_job.interface'

export default class WorkerRunningJobModel extends Model<IWorkerRunningJob, IWorkerRunningJobNew, IWorkerRunningJobUpdate> {
    constructor() {
        super()
        this.connectionName = 'DB_ADMIN'
        this.schemaName = 'admin'
        this.tableName = 'Worker_running_jobs'
        this.tableId = 'id'
        this.tableFields = [
            {
                name: 'id',
                description: 'Identificador único de la tabla worker_running_jobs',
                required: false,
            },
            {
                name: 'worker_name',
                description: 'Nombre del worker',
                dataType: 'string',
                required: true,
            },
            {
                name: 'job_name',
                description: 'Nombre del job',
                dataType: 'string',
                required: true,
            },
            {
                name: 'start_time',
                description: 'Fecha y hora de inicio del job',
                dataType: 'datetime',
                required: true,
            },
            {
                name: 'end_time',
                description: 'Fecha y hora de fin del job',
                dataType: 'datetime',
                required: false,
            },
            {
                name: 'status',
                description: 'Estado del job',
                dataType: 'string',
                required: true,
            },
            {
                name: 'user_id',
                description: 'Identificador del usuario',
                dataType: 'number',
                required: true,
            },
            {
                name: 'message',
                description: 'Mensaje del job',
                required: false,
            },
        ]
        this.fieldNames = this.getFieldsString()
        this.addAuditFields = false
    }

    async isThereARunningJob({ jobName }: { jobName: string }): Promise<IWorkerRunningJob[]> {
        const pool: Knex = await this.connection.getConnection(this.connectionName)
        const consult = pool
            .select('*')
            .from(`${this.schemaName}.${this.tableName}`)
            .where('job_name', jobName)
            .where(function () {
                this.where('status', 'pending').orWhere('status', 'running')
            })
            .andWhere('start_time', '>=', pool.raw('DATEADD(hour, -2, GETDATE())'))
        const result: any[] = await consult
        return result
    }
}
