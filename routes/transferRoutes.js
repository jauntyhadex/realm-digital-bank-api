const express = require("express");

const router = express.Router();

const Customer = require("../models/Customer");

const Transaction = require("../models/Transaction");


/**
 * @swagger
 * /api/transfers/transfer:
 *   post:
 *     summary: Transfer money
 *     tags: [Transfers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromAccount:
 *                 type: string
 *               toAccount:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful
 */

// transfer money
router.post("/transfer", async (req, res) => {

  try {

    const {
      fromAccount,
      toAccount,
      amount,
    } = req.body;


    // find sender
    const sender = await Customer.findOne({
      accountNumber: fromAccount,
    });

    // find receiver
    const receiver = await Customer.findOne({
      accountNumber: toAccount,
    });

    // check if account exist
    if (!sender || !receiver) {

      return res.status(404).json({
        message: "Account not found",
      });

    }

    // check balance
    if (sender.balance < amount) {

      return res.status(400).json({
        message: "Insufficient balance",
      });

    }

    // deduct sender
    sender.balance -= amount;

    // credit receiver
    receiver.balance += amount;

    // save both
    await sender.save();

    await receiver.save();

    // generate transaction ref
    const transactionReference =
      "TX" + Date.now();

    // save transaction
    const transaction =
      await Transaction.create({

        fromAccount,

        toAccount,

        amount,

        transactionReference,

        status: "successful",

      });


    // response
    res.status(200).json({

      message:
        "Transfer successful",

      transaction,

    });




  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// transaction status
router.get(
  "/transaction-status/:reference",

  async (req, res) => {

    try {

      const transaction =
        await Transaction.findOne({

          transactionReference:
            req.params.reference,

        });




      if (!transaction) {

        return res.status(404).json({
          message:
            "Transaction not found",
        });

      }




      res.status(200).json(transaction);




    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// transaction history
router.get(
  "/history/:accountNumber",

  async (req, res) => {

    try {

      const accountNumber =
        req.params.accountNumber;




      const transactions =
        await Transaction.find({

          $or: [

            {
              fromAccount:
                accountNumber,
            },

            {
              toAccount:
                accountNumber,
            },

          ],

        });




      res.status(200).json(
        transactions
      );




    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);




module.exports = router;