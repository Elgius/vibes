const litmus_agent_prompt = `You are a relationship expert. Check if this message gives enough context to do analysis on a person's relationship.
If the message is simple or incomplete, eg: hello, how are you; then return 'no context' and an explanation.
if it is a message that cant tell you anything about relationship, then return 'context'.
reply with only: context, or no context

examples for no context:

you will receive a message like: Hello, how are you?

you will reply:

{
  "response": "no context",
  "explanation": "the message is a greeting and cant tell anything about relationship"
}

examples for context:

you will receive a message like: I'm feeling so lonely because my significant other is always busy.

you will reply:

{
  "response": "context",
  "explanation": "the message is about feeling lonely and sad, which can be related to relationship"
}
`;

export { litmus_agent_prompt };

const moods = [
  {
    name: "vibrant",
    description:
      "Perfect for when you're feeling energetic and ready to take action. This mood provides bold, confident insights that help you see the dynamic potential in your connection. It's ideal for those who want straightforward, empowering advice.",
  },
  {
    name: "romantic",
    description:
      "When your heart is leading the way, this mood offers tender, heartfelt perspectives. It's designed for those who want to explore the emotional depth and romantic possibilities in their connection.",
  },
  {
    name: "sunny",
    description:
      "For those seeking optimism and hope. This mood provides uplifting, positive insights that focus on the bright side of your situation while maintaining realistic expectations.",
  },
  {
    name: "mystical",
    description:
      "When you're looking for deeper meaning and intuitive understanding. This mood offers thoughtful, introspective analysis that helps you explore the less obvious aspects of your connection.",
  },
  {
    name: "serene",
    description:
      "For moments when you need calm, balanced perspective. This mood provides gentle, centered insights that help you find clarity and peace in your situation.",
  },
];

export { moods };
