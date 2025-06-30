import { IncentiveCodeRequest, IncentivesResponse } from "@/app/types/types";
import { checkIfIncentiveCodeExists, getAllIncentives, insertIncentiveCode } from "@/app/utils/db";
import { generateIncentiveCode, sendErrorResponse, sendJsonResponse } from "@/app/utils/response";

export async function GET() {
  const incentives = await getAllIncentives();
  
  const filteredInc: IncentivesResponse[] = [];

  incentives.forEach(inc => {
    const i = filteredInc.findIndex(fi => fi.id === inc.id);
    const { id, game, title, info, endtime, incentive_type: incentiveType, milestone_amount: milestoneAmount } = inc;
    if (i < 0) {
      if (incentiveType === 'milestone') {
        filteredInc.push({
          id,
          game,
          title,
          info,
          endtime,
          incentiveType,
          milestone: { raised: inc.sum ?? 0, goal: milestoneAmount }
        });
      } else {
        const incentiveValues = inc.inc_value ? [{ name: inc.inc_value, amount: inc.sum }] : undefined;
        filteredInc.push({
          id,
          game,
          title,
          info,
          endtime,
          incentiveType,
          incentiveValues,
        });
      }
    } else {
      filteredInc[i].incentiveValues?.push({ name: inc.inc_value, amount: inc.sum })
    }    
  });

  const sortedRes = filteredInc.sort((a, b) => {
    return new Date(a.endtime).getTime() - new Date(b.endtime).getTime();
  })

  return sendJsonResponse(sortedRes);
}

export async function POST(request: Request) {
  const body: IncentiveCodeRequest = await request.json();

  let id: string = '';
  try {
    id = await generateValidIncentiveCode();
  } catch (error) {
    return sendErrorResponse('id generation error');
  }

  const incentiveCode = {
    id,
    incentiveId: body.id,
    value: body.value,
  }
  try {
    await insertIncentiveCode(incentiveCode);
    return sendJsonResponse({ id });
  } catch (error) {
    return sendErrorResponse('database error');
  }
}

const generateValidIncentiveCode = async (retryCount = 0): Promise<string> => {
  if (retryCount > 6) {
    throw new Error('incentive code retry count');
  }
  
  const id = generateIncentiveCode();
  const duplicateId = await checkIfIncentiveCodeExists(id);
  if (duplicateId) {
    const newId = generateValidIncentiveCode(retryCount + 1);
    return newId;
  }
  return id;
}
