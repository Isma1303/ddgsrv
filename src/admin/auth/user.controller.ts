import { Request, Response as ExpResponse } from "express";
import { Controller } from "../../system/controller";
import { IUser, IUserLogin, IUserNew, IUserUpdate } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";
import { HttpResponseStatus, Response } from "../../system/shared/interfaces/http-response.interface";
import { generateToken } from "../../system/shared/utils/jwt";

export class UserController extends Controller<IUser, IUserNew, IUserUpdate> {
    constructor() {
        super(new UserModel())
    }

    async register(req: Request): Promise<Response> {
        const model = new UserModel()
        try {
            const user: IUserNew = req.body
            const hashPassword = await bcrypt.hash(user.password, 10)
            const response = await model.register({ ...user, password: hashPassword })

            return {
                message: "User registered successfully",
                status: HttpResponseStatus.OK,
                data: response
            }
        } catch (error) {
            return {
                message: "User registration failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }

    async login(req: Request, res: ExpResponse): Promise<Response> {
        const model = new UserModel()
        try {
            const { email, password }: IUserLogin = req.body
            const user = await model.login(email)

            if (!user) {
                return {
                    message: "User not found",
                    status: HttpResponseStatus.NOT_FOUND,
                    data: null
                }
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return {
                    message: "Invalid password",
                    status: HttpResponseStatus.UNAUTHORIZED,
                    data: null
                }
            }

            const token = generateToken({ user_id: user.user_id })

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 8 * 60 * 60 * 1000
            })

            return {
                message: "User logged in successfully",
                status: HttpResponseStatus.OK,
                data: {
                    token,
                    user_id: user.user_id,
                }
            }
        } catch (error) {
            return {
                message: "User login failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }

    async logout(req: Request, res: ExpResponse): Promise<Response> {
        try {
            res.clearCookie("token")

            return {
                message: "User logged out successfully",
                status: HttpResponseStatus.OK,
                data: null
            }
        } catch (error) {
            return {
                message: "User logout failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }

    async updatePassword(req: Request): Promise<Response> {
        const model = new UserModel()
        try {
            const { password } = req.body
            const { user_id } = req.params
            const hashPassword = await bcrypt.hash(password, 10)
            const response = await model.updatePassword(Number(user_id), hashPassword)
            return {
                message: "User password updated successfully",
                status: HttpResponseStatus.OK,
                data: response
            }
        } catch (error) {
            return {
                message: "User password update failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }

    async profile(req: Request): Promise<Response> {
        const model = new UserModel()
        try {
            const { user_id } = req.params
            const user = await model.profile(Number(user_id))
            return {
                message: "User profile fetched successfully",
                status: HttpResponseStatus.OK,
                data: user
            }
        } catch (error) {
            return {
                message: "User profile fetch failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }

    async deleteUser(req: Request): Promise<Response> {
        const model = new UserModel()
        try {
            const { id } = req.params
            const response = await model.deleteUser(Number(id))
            return {
                message: "User deleted successfully",
                status: HttpResponseStatus.OK,
                data: response
            }
        } catch (error) {
            return {
                message: "User deletion failed",
                status: HttpResponseStatus.INTERNAL_SERVER_ERROR,
                data: error
            }
        }
    }
}