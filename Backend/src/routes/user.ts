import { Router, Request, Response } from "express";
import { z } from "zod";
import { List, user } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { authenticateToken, AuthenticatedRequest } from "../auth";


const userRouter = Router();



const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
async function userExists(username: string, email: string): Promise<boolean> {
  const existingUser = await user.findOne({
    $or: [{ username }, { email }],
  });
  return !!existingUser;
}

userRouter.post("/signup", async (req: Request, res: Response):Promise<any> => {
  const userData = req.body.userData;

  const validation = signupSchema.safeParse(userData);
  if (!validation.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { username, email, password } = userData;

  if (await userExists(username, email)) {
    return res.status(411).json({
      message: "Email or Username already taken",
    });
  }

  const hashedPassword = await hashPassword(password);

  const userD = await user.create({
    username,
    email,
    password: hashedPassword,
  });

  if (userD) {
    const token = jwt.sign({ userId: userD._id }, JWT_SECRET,{expiresIn:'24h'});
    return res.status(200).json({ token });
  }

  return res.status(500).json({
    message: "Error while creating user",
  });
});
userRouter.post("/signin", async (req:Request,res:Response):Promise<any>=>{
    const userData=req.body.userData;
    const parsed=signinSchema.safeParse(userData);
    if(!parsed.success){
        return res.status(411).json({
         message:"Invalid Inputs"
        })
    };
    try{
   const p= await user.findOne({
    email:userData.email,
   })
   if(!p){
      return res.status(411).json({
        message:"Invalid Email"
      })
   }
   const isPasswordValid= await comparePasswords(userData.password,p.password)
   if(!isPasswordValid){
    return res.status(401).json({
        message:"Invalid password"
    })
   }
 const token=jwt.sign({userId:p._id},JWT_SECRET,{expiresIn:'24h'});
 return res.status(200).json({
    token:token
 })}catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({
      message: "Something bad happened"
    });
  }

})
userRouter.get("/home",authenticateToken, async (req:AuthenticatedRequest,res:Response):Promise<any>=>{
    
    try{
    const lists=await List.find({userId:req.userId});
    res.status(200).json({
        lists:lists
    })
}catch(err){
    console.error("Error fetching lists:", err);
    res.status(500).json({
        message:"Error fetching lists"
    });
}

});

export default userRouter;
