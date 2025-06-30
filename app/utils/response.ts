const INCENTIVE_CODE_LENGTH = 8;
export const generateIncentiveCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < INCENTIVE_CODE_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


export const sendJsonResponse = (jsonData: Record<any, any>): Response => {
  return new Response(JSON.stringify(jsonData), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};

export const sendErrorResponse = (resText: string): Response => {
  return new Response(resText, {
    status: 500,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
};
