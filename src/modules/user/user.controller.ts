import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);

    // const { name, email, password, age } = req.body;

    try {
       const result = await userService.createUserIntoDb(req.body)



        // console.log(result)

        res.status(201).json({
            message: "User Created Successfully",
            success: true,
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        })
    }
}


//get all user

const getAllUsers =  async (req: Request, res: Response) => {
    try {
       
        const result = await userService.getAllUsersFromBD()
        res.status(200).json({
            success: true,
            message: "User retrived Successfully",
            data: result.rows,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }
}


const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
       const result = await userService.getSingleUserFromDb(id as string)


        if (result.rows.length === 0) {
            res.status(500).json({
                success: false,
                message: "User Not found",
                data: {}
            });
        }



        res.status(200).json({
            success: true,
            message: "Single User Retried Successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(404).json({
            success: false,
            message: 'Something went wrong',
            data: {}
        });
    }
}


const updateUser =  async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { name, password, age, is_active } = req.body;

    // console.log("Id :",id)
    // console.log({name,password,age,is_active});

    try {
       const result = await userService.updateUserFromDB(req.body,id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found",
                data: {}
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }

}


const deleteUser=async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
       const result = await userService.deleteUserFromDB(id as string)

        res.status(200).json({
            success: true,
            message: "User Delated successfully",
            data: {}
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

export const userController ={
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser

}