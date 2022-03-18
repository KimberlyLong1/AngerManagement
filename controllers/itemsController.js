 const router = require("express").Router(); 
 let validateJWT = require("../middleware/validate-session")
 const { models  } = require("../model")


// GET ALL ITEMS by userID
router.get("/getmyitems", validateJWT, async (req, res) => {
    
      const itemid = req.item.id
      try {
        const allItems = await models.ItemsModel.findAll({where: { id: itemid}})
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
        name: req.body.item.name,
        time: req.body.item.time,
        price: req.body.item.price,
        numberOfPeople: req.body.item.numberOfPeople,
        description: req.body.item.description,
        image: req.body.item.image,
        packageCode: req.body.item.packageCode,  
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