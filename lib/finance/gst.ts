/**
 * GST Calculation Engine — lib/finance/gst.ts
 *
 * Indian GST rules for corporate event invoicing:
 *   - Intra-state (supplier state == recipient state):
 *       CGST = 9% of base amount
 *       SGST = 9% of base amount
 *       IGST = 0
 *   - Inter-state (supplier state != recipient state):
 *       CGST = 0
 *       SGST = 0
 *       IGST = 18% of base amount
 *
 * All amounts are in integer paise. Math uses Math.floor to avoid
 * fractional paise. Floating point is never used for final stored values.
 */

/** GST rate as a fraction. 18% = 0.18. */
const GST_RATE = 0.18;

/** Half rate for CGST and SGST splits. 9% = 0.09. */
const HALF_GST_RATE = GST_RATE / 2;

export type GstTaxMode = "CGST_SGST" | "IGST";

export type GstResult = {
  /** Base amount before tax, in paise. */
  baseAmount: number;
  /** Central GST (9%), in paise. 0 when IGST applies. */
  cgstAmount: number;
  /** State GST (9%), in paise. 0 when IGST applies. */
  sgstAmount: number;
  /** Integrated GST (18%), in paise. 0 when CGST/SGST applies. */
  igstAmount: number;
  /** Total invoice amount including all applicable tax, in paise. */
  totalAmount: number;
  /** Which tax mode was applied to this calculation. */
  taxMode: GstTaxMode;
};

/**
 * Calculates GST on a base amount in paise.
 *
 * @param baseAmount - Venue base cost in paise (integer, > 0)
 * @param isIntraState - true = same state (CGST+SGST), false = cross-state (IGST)
 * @returns GstResult with all amounts in integer paise
 *
 * @example
 *   // ₹1,00,000 base, intra-state
 *   calculateGst(10000000, true)
 *   // => { baseAmount: 10000000, cgstAmount: 900000, sgstAmount: 900000,
 *   //       igstAmount: 0, totalAmount: 11800000, taxMode: "CGST_SGST" }
 *
 * @example
 *   // ₹1,00,000 base, inter-state
 *   calculateGst(10000000, false)
 *   // => { baseAmount: 10000000, cgstAmount: 0, sgstAmount: 0,
 *   //       igstAmount: 1800000, totalAmount: 11800000, taxMode: "IGST" }
 */
export function calculateGst(baseAmount: number, isIntraState: boolean): GstResult {
  if (!Number.isInteger(baseAmount) || baseAmount <= 0) {
    throw new Error(`GST base amount must be a positive integer paise value; got ${baseAmount}.`);
  }

  if (isIntraState) {
    const cgstAmount = Math.floor(baseAmount * HALF_GST_RATE);
    const sgstAmount = Math.floor(baseAmount * HALF_GST_RATE);
    const totalAmount = baseAmount + cgstAmount + sgstAmount;
    return {
      baseAmount,
      cgstAmount,
      sgstAmount,
      igstAmount: 0,
      totalAmount,
      taxMode: "CGST_SGST",
    };
  }

  // Inter-state: IGST only
  const igstAmount = Math.floor(baseAmount * GST_RATE);
  const totalAmount = baseAmount + igstAmount;
  return {
    baseAmount,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount,
    totalAmount,
    taxMode: "IGST",
  };
}

/**
 * Determines intra-state vs inter-state from two Indian state identifiers.
 *
 * For the MVP the "state" can be any comparable string —
 * a 2-letter state code ("MH", "DL") or a city name ("Mumbai", "Delhi")
 * as long as both sides use the same convention. A case-insensitive match
 * is performed so "mh" == "MH".
 */
export function isIntraState(supplierState: string, recipientState: string): boolean {
  return supplierState.trim().toLowerCase() === recipientState.trim().toLowerCase();
}
