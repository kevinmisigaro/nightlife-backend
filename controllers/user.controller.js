const prismaClient = require("@prisma/client");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const bcrypt = require("bcrypt")

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const prisma = new prismaClient.PrismaClient();

//get all users
exports.getAllUsers = async (req,res) => {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
}

//register user
exports.registerUser = async (req, res) => {
  let avatar;

  if (req.files) {
    avatar = req.files.image;
    avatar.mv("/uploads/user/" + avatar.name);
  }

  const salt = await bcrypt.genSalt(10)

  const createdUser = await prisma.user.create({
    data: {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      created_at: Number(moment().valueOf()),
      profile_image: !req.files ? null : `/uploads/user/${avatar.name}`,
    },
  });

  if (!createdUser) {
    res.status(404).json({
      message: "Failed to create User",
    });
  } else {
    res.status(201).json({
      message: "User created",
    });
  }
};

//change status
exports.changeStatus = async (req, res) => {
  const { id } = req.params;

  const userToUpdate = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: userToUpdate.id,
    },
    data: {
      active: userToUpdate.active ? false : true,
    },
  });

  if (!updatedUser || updatedUser.length == 0) {
    res.status(404).json({
      message: "Failed to update user",
    });
  } else {
    res.status(301).json(updatedUser);
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  if (!deletedUser || deletedUser.length == 0) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.status(202).json({
      message: "User deleted",
    });
  }
};

//get one user
exports.findUser = async (req, res) => {
  const { id } = req.params;

  const singleUser = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!singleUser || singleUser.length == 0) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.status(200).json(singleUser);
  }
};

//update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  let avatar;

  if (req.files) {
    avatar = req.files.image;
    avatar.mv("/uploads/user/" + avatar.name);
  }

  const updatedUser = await prisma.club.update({
    where: {
      id: Number(id),
    },
    data: {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      current_location: req.body.location,
      profile_image: !req.files ? null : `/uploads/user/${avatar.name}`,
    },
  });

  if (!updatedUser || updatedUser.length == 0) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.status(301).json(updatedUser);
  }
};


//follow friend
exports.followAction = async (req, res) => {
    const relationship = await prisma.friend.create({
      data:{
        user_id: Number(req.body.user_id),
        follower_id: Number(req.body.follower_id),
        created_at: moment().valueOf()
      }
    })

    if(!relationship){
      res.status(404).json({message: "Failed to follow"})
    } else {
      res.status(201).json({message: "Able to follow"})
    }
}


exports.showFriendsListForUser = async (req, res) => {
  const { id } = req.params;

  const singleUser = await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
  })

  if (!singleUser || singleUser.length == 0) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.status(200).json(singleUser);
  }
}