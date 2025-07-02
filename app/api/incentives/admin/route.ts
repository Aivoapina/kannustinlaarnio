import { API_KEY } from "@/app/utils/constants";
import { closeIncentive, getAdminIncentives } from "@/app/utils/db";
import { sendJsonResponse, sendNotAuthorizedResponse } from "@/app/utils/response";

export async function GET() {
  const incetives = await getAdminIncentives();
  
  return sendJsonResponse(incetives);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.apikey === API_KEY && body.id) {
    closeIncentive(body.id);
    return sendJsonResponse({ success: true });
  }

  return sendNotAuthorizedResponse('Unauthorized');
}
