import { getDonationTotal } from "@/app/utils/db";
import { sendJsonResponse } from "@/app/utils/response";

export async function GET() {
  const donationTotal = await getDonationTotal();

  return sendJsonResponse(donationTotal);
}