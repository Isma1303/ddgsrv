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

            const token = generateToken({ user_id: user.user_id, role: user.role })

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
                    role: user.role
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
            const user: IUserUpdate = req.body
            const response = await model.updatePassword(user.user_id!, user.password!)
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
}