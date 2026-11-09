'use strict';

const { execSync } = require('node:child_process');

const SYSTEM_PROMPT = 'You are Octo Shop support. Summarize the customer issue for the on-call engineer.';

// Demo 7 (code scanning for AI apps):
//  - untrusted issue text is mixed into the instructions (indirect prompt injection / XPIA)
//  - the model can run any shell command it asks for (excessive agency)
//  - environment variables are sent to the model (sensitive information disclosure)
function buildPrompt(issueBody) {
  return `${SYSTEM_PROMPT}\n${issueBody}\nServer env: ${JSON.stringify(process.env)}`;
}

const tools = {
  run_shell: ({ command }) => execSync(command).toString(),
};

async function summarizeIssue(issueBody, { endpoint = process.env.LLM_ENDPOINT, apiKey = process.env.LLM_API_KEY } = {}) {
  if (!endpoint) throw new Error('LLM_ENDPOINT is not configured');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ messages: [{ role: 'system', content: buildPrompt(issueBody) }], tools: Object.keys(tools) }),
  });
  const reply = await res.json();
  for (const call of reply.tool_calls || []) {
    reply.content += '\n' + tools[call.name](call.arguments);
  }
  return reply.content;
}

module.exports = { buildPrompt, summarizeIssue, tools };
