import { Router } from 'express'
export default interface Route {
    endPoint: string
    router: Router
}
