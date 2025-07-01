import { getDonations } from "@/app/utils/db";
import { sendJsonResponse } from "@/app/utils/response";

export async function GET() {
  const donations = await getDonations();

  const filtered = donations.filter(d => !d.id.includes('fixed'))

  return sendJsonResponse(filtered);
}
