import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@decoded-satapathy/medium-common"


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      msg: "Invalid input"
    })
  }
  try {
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!isUserExist) {
      c.status(403);
      return c.json({ msg: "Email already in use." })
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: jwt, id: user.id });
  } catch (e) {
    console.log(e)
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
})

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({
      msg: "Invalid input"
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    // console.log(user)

    if (user) {
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
      return c.json({ jwt: token })
    } else {
      c.status(405)
      return c.json({ msg: "User not found" })
    }

  } catch (e) {
    // console.log("Some error occured")
    c.status(411);
    return c.text("Error occured")
  }
})

userRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const users = await prisma.user.findMany({
    where: {

    }
  })
  console.log(users)
  return c.json({ users })

})

userRouter.post("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();

  try {
    const response = await verify(body.token, c.env.JWT_SECRET);
    const currentUser = await prisma.user.findUnique({
      where: {
        id: response.id
      },
      select: {
        name: true
      }
    }) || { name: "Deleted User" }

    c.status(200);
    return c.json({ msg: "Token is correct", userName: currentUser });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "Token is wrong" })

  }

})
