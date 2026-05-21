import { Router} from "express";
import { userController } from "./user.controller";



const router = Router()

//create new user using post
router.post('/',userController.createUser)

// get user

router.get('/',userController.getAllUsers)


//get single user

router.get('/:id',userController.getSingleUser );


//update
router.put('/:id',userController.updateUser)


//delete user
router.delete('/:id',userController.deleteUser )



export const userRoute = router