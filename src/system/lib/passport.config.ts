import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../../config'
import UserModel from '../../security/user/user.model'

const opcionesJWT: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
}

const strategyJWT = new Strategy(opcionesJWT, async (payload, callback) => {
    try {
        const userModel = new UserModel()
        const foundUsers = await userModel.getById(payload.id)
        if (foundUsers) return callback(null, foundUsers)
        return callback(null, false)
    } catch (err) {
        console.error(err)
    }
})

export const strategies = {
    JWT: {
        strategy: strategyJWT,
    },
}
