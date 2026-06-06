import express from "express"

const router = express();

router.use("/status", (_, res) => {
    res.send("Server is live!")
})

export default router;