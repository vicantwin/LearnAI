import { summarization } from "https://cdn.jsdelivr.net/npm/@huggingface/inference@2.6.1/+esm";
import textrun from "./gradio";

const ACCESS_TOKEN = "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";

async function hfrun() {
  const text = document.getElementById("context").innerText;
  const result = await summarization({
    accessToken: ACCESS_TOKEN,
    model: "facebook/bart-large-cnn",
    inputs: text,
    parameters: {
      max_length: 10000,
    },
  });
  console.log("Summary: ", result);

  // Use the summarized text as input for Gradio's text generation model
  await textrun(result.summary_text);
}

document.getElementById("questgen").addEventListener("click", hfrun);
