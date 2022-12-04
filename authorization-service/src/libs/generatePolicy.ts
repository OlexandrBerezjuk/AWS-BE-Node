// resource - means where does this request come from
export const generatePolicy = (principalId, resource, effect = "allow") => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: effect,
        Action: 'execute-api:Invoke',
        Resource: resource,
      },
    ],
  },
});
