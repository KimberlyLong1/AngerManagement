 const router = require("express").Router(); // way to merge lines 1 and 2! 
 let validateJWT = require("../middleware/validate-session")
 const { models, packageCode  } = require("../model")


// GET ALL ITEMS by userID
router.get("/getitems/:id", validateJWT, async (req, res) => {
    
      const itemid = req.params.id
      try {
        const allItems = await models.ItemsModel.findAll({
          where: { id: itemid}})
          console.log(allItems)
          res.status(200).json(allItems)
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: err})
      }});

// CREATE ITEM
router.post("/", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
      const createItem = await models.ItemsModel.create({
        name: req.body.name,
        time: req.body.time,
        price: req.body.price,
        numberOfPeople: req.body.numberOfPeople,
        description: req.body.description,
        image: req.body.image,
        packageCode: req.body.packageCode,  
        userId: id,
      })
      console.log(createItem)
      res.status(201).json({
        message: "Item sucessfully created",
        createItem
      })
    } catch(err) {
      res.status(500).json({
        message: `Failed to create item ${err}`
      })
    }
  })
  
// UPDATE ITEM
router.put("/:id", validateJWT, async (req, res) => {
    const itemsid = req.params.id
    const {
      name,
      time,
      price,
      numberOfPeople,
      description,
      image,
      packageCode,
     } = req.body.item;     
      try {
        await models.ItemsModel.update(
          { name, time, price, numberOfPeople, description, image, packageCode},
          { where: { userId: itemsid }}
        )
        .then((result) => {
          res.status(200).json({
            message: "Item successfully updated",
            updateItem: result
          })
        })
      } catch (err) {
        res.status(500).json({
          message: `Failed to update item ${err}`
        })
      }})


// DELETE ITEM
router.delete("/:id",validateJWT, async (req,res) => {
      const id = req.params.id
      const itemsid = req.user.id;
    try {
      await models.ItemsModel.destroy({
        where: {userId: itemsid, id: id}
      });
      res.status(200).json({message: "Item sucessfully deleted"})
    } catch (err) {
      res.status(500).json({
        message: `Failed to delete item ${err}`
      });
    }
  });
module.exports = router;