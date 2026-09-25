"use client";

import { useState } from "react";
import { CreditCard, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  createPaymentOrderAction,
  verifyPaymentAction,
} from "@/app/dashboard/finance/actions";
import { formatRupees } from "@/lib/events/event-helpers";

type RazorpayPayButtonProps = {
  eventId: number;
  amountPaise: number;
  invoiceNumber?: string;
  variant?: "primary" | "secondary" | "compact";
};

type RazorpayFailedResponse = {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (response: RazorpayFailedResponse) => void) => void;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

/**
 * Helper to dynamically load the Razorpay Checkout JS SDK script.
 */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayPayButton({
  eventId,
  amountPaise,
  invoiceNumber,
  variant = "primary",
}: RazorpayPayButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePay = async () => {
    setErrorMessage(null);
    setIsPending(true);

    try {
      // 1. Call server action to create Razorpay Order securely
      const order = await createPaymentOrderAction(eventId);

      // 2. Check if placeholder keys are active (unconfigured .env)
      const isPlaceholder =
        !order.keyId ||
        order.keyId.includes("placeholder") ||
        order.orderId.startsWith("order_dev_");

      if (isPlaceholder) {
        // Dev Mode Simulation for unconfigured environments
        await new Promise((res) => setTimeout(res, 600));

        const result = await verifyPaymentAction({
          eventId,
          razorpayOrderId: order.orderId,
          razorpayPaymentId: `pay_dev_${Date.now()}`,
          razorpaySignature: "mock_signature_dev",
        });

        if (result.success) {
          setPaymentCompleted(true);
        }
        return;
      }

      // 3. Real Razorpay Test/Live Keys Configured: Load Razorpay Checkout JS SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error(
          "Failed to load Razorpay Checkout SDK. Please check your network connection.",
        );
      }

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: order.companyName,
        description: `Tax Invoice ${order.invoiceNumber} · ${order.eventTitle}`,
        order_id: order.orderId,
        prefill: {},
        theme: {
          color: "#7e22ce", // Purple 700
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const result = await verifyPaymentAction({
              eventId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (result.success) {
              setPaymentCompleted(true);
            }
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setErrorMessage(msg);
          } finally {
            setIsPending(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsPending(false);
          },
        },
      };

      const RazorpayClass = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
      const razorpayInstance = new RazorpayClass(options);
      razorpayInstance.on("payment.failed", function (response: RazorpayFailedResponse) {
        setIsPending(false);
        const reason =
          response?.error?.description || "Payment was rejected or cancelled.";
        setErrorMessage(reason);
      });

      razorpayInstance.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsPending(false);
    }
  };

  if (paymentCompleted) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="h-4 w-4" />
        <span>Payment Verified &amp; Event Booked</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1 items-end">
        {errorMessage && (
          <span className="text-[11px] font-medium text-rose-600 max-w-xs truncate">
            {errorMessage}
          </span>
        )}
        <button
          type="button"
          onClick={handlePay}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-md bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-3.5 w-3.5" />
              <span>Pay {formatRupees(amountPaise)}</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full sm:w-auto">
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={isPending}
        id={`pay-now-btn-${eventId}`}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            <span>
              Pay {formatRupees(amountPaise)}{" "}
              {invoiceNumber ? `(${invoiceNumber})` : ""}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
