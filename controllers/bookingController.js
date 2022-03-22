const router = require("express").Router(); // way to merge lines 1 and 2! 
let validateJWT = require("../middleware/validate-session")
const { models, user } = require("../model")

 // GET ALL EVENTS by userID
////////////////Working////////////////////////////////
router.get("/getmy", validateJWT,async (req, res) => {
 
    const ownerid = req.user.id
    try {
    const allBookings = await models.BookingModel.findAll({ where: { id: ownerid}})
        console.log(allBookings)
     res.status(200).json(allBookings)
 
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
}}); 

// Create a booking
////////////////Working////////////////////////////////
router.post("/", validateJWT, async (req, res) =>{
    const { id } = req.user;

    try {
        const createBooking = await models.BookingModel.create({
            contactFirstName: req.body.booking.contactFirstName,
            contactLastName: req.body.booking.contactLastName,
            email: req.body.booking.email,
            phoneNumber: req.body.booking.phoneNumber,
            userId: id 
        });
        console.log(createBooking)
        res.status(201).json({
            message: "Event successfully created",
            createBooking
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to create booking ${err}`
        })
    }
})

// UPDATE BOOKING: 
////////////////Working////////////////////////////////
router.put("/:id", validateJWT, async (req, res) => {
    const ownerid = req.user.id
    const id = req.params.id
      const {
          contactFirstName,
          contactLastName,
          email,
          phoneNumber,
          
      } = req.body.booking //faster way one lines 27-33. destructuring object. 
  
      try {
          await models.BookingModel.update(
              { contactFirstName, contactLastName, email, phoneNumber},
              { where: {id: id, userId: ownerid } } //looking to update where the id in our database matches the id in our endpoint // return the effect that rose
          )
          .then((result) => {
              res.status(200).json({
                  message: "Event successfully updated.",
                  updatedBooking: result 
              })
          })
      } catch (err) {
          res.status(500).json({
              message: `Failed to update event ${err}`
          })
      }
  })

// DELETE BOOKING
////////////////Working////////////////////////////////
router.delete("/:id", validateJWT, async (req, res) =>{
    const id = req.params.id
    const ownerid = req.user.id; 
    try { 
      await models.BookingModel.destroy({
          where: { userId: ownerid, id :id}
      })
      res.status(200).json({
          message: "Booking successfully deleted"
      })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete booking ${err}`
        })
    };

});

module.exports = router;