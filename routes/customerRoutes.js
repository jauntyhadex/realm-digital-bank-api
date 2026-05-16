const express = require("express");

const router = express.Router();

const Customer = require("../models/Customer");

const {
  validateBVN,
  validateNIN,
} = require("../services/nibssService");


/**
 * @swagger
 * /api/customers/create-customer:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               bvn:
 *                 type: string
 *               nin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 */

// create customer
router.post("/create-customer", async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      bvn,
      nin,
    } = req.body;


    let verified = false;


    // validate BVN
    if (bvn) {

      const bvnResult = await validateBVN(bvn);

      console.log("BVN RESULT:", bvnResult);

      if (bvnResult.success === true) {
        verified = true;
      }
    }

    // validate NIN
    if (nin && !verified) {

      const ninResult = await validateNIN(nin);

      console.log("NIN RESULT:", ninResult);

      if (
        ninResult.message === "NIN Verified!!"
      ) {
        verified = true;
      }
    }

    // block invalid customer
    if (!verified) {

      return res.status(400).json({
        message:
          "Customer verification failed. Invalid BVN or NIN",
      });
    }

    // create account number
    const accountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000
    ).toString();

    // create customer
    const customer = await Customer.create({

      fullName,
      email,
      phone,
      bvn,
      nin,

      verified: true,

      accountNumber,

      balance: 15000,

    });

    // response
    res.status(201).json({

      message:
        "Customer onboarded successfully",

      customer,

    });



  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// get all customers
router.get("/all-customers", async (req, res) => {

  try {

    const customers = await Customer.find();

    res.status(200).json(customers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// get single customer
router.get("/:id", async (req, res) => {

  try {

    const customer = await Customer.findById(
      req.params.id
    );

    if (!customer) {

      return res.status(404).json({
        message: "Customer not found",
      });

    }

    res.status(200).json(customer);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// check balance
router.get("/balance/:id", async (req, res) => {

  try {

    const customer = await Customer.findById(
      req.params.id
    );

    if (!customer) {

      return res.status(404).json({
        message: "Customer not found",
      });

    }

    res.status(200).json({

      accountNumber:
        customer.accountNumber,

      balance:
        customer.balance,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



module.exports = router;