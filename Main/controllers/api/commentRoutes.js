const router = require('express').Router();
const { Comment, Post, User } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ["id", "comment_text", "user_id", "post_id"],
            include: [
            {
                model: User,
                as: "user",
                attributes: ["username"],
            },
            ],
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk({
            where: {
                id: req.params.id,
              },
              attributes: ["id", "comment_text", "user_id", "post_id"],
              include: [
                {
                  model: User,
                  as: "user",
                  attributes: ["username"],
                },
              ], 
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
            }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/", async (req, res) => {
    try {
        const commentData = await Comment.update(
            res.send(`update comment`),
        )
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Post.destroy({
            where: {
                id: req.params.id,
              },  
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
            }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

