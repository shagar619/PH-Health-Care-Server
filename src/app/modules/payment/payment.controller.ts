/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { stripe } from "../../helper/stripe";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";
import { PaymentService } from "./payment.service";


const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {

     const sig = req.headers["stripe-signature"] as string;

     const webhookSecret = "whsec_e7938d64357460726e3698bdc70cb5f4d37598f1ceb5b0306bccddddb6425af6";

     if (!webhookSecret) {
          console.error("⚠️ Stripe webhook secret not configured");
          return res.status(500).send("Webhook secret not configured");
     }

     let event;
     try {
          event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
     } catch (err: any) {
          console.error("⚠️ Webhook signature verification failed:", err.message);

          return res.status(400).send(`Webhook Error: ${err.message}`);
     }

     try {
               const result = await PaymentService.handleStripeWebhookEvent(event);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Webhook req send successfully',
          data: result,
     });
     } catch (error: any) {
          console.error("❌ Error processing webhook:", error);
          // Still return 200 to acknowledge receipt to Stripe
          // Stripe will retry if we return an error
          sendResponse(res, {
               statusCode: 200,
               success: true,
               message: 'Webhook received but processing failed',
               data: { error: error.message },
          });
     }
});

export const PaymentController = {
     handleStripeWebhookEvent
}