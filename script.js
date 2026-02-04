// Simple client-side heuristic rewriter for demo purposes
// Keeps core text but adds phrasing cues to emphasize a "hormone" style.
// This is not an LLM; it's a prototype for showcasing the idea.

const form = document.getElementById("form");
const storyEl = document.getElementById("story");
const hormoneEl = document.getElementById("hormone");
const consentEl = document.getElementById("consent");
const errorEl = document.getElementById("error");
const resultSection = document.getElementById("result");
const outputEl = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

const samples = [
  "Sam found an old key in the attic and wondered what it opened.",
  "Maya sat alone on the station bench, hugging her suitcase and waiting.",
  "A small dog appeared on the doorstep with a faded ribbon around its neck."
];

document.getElementById("sample1").onclick = () => loadSample(0);
document.getElementById("sample2").onclick = () => loadSample(1);
document.getElementById("sample3").onclick = () => loadSample(2);

function loadSample(i) {
  storyEl.value = samples[i];
  errorEl.textContent = "";
  resultSection.classList.add("hidden");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.textContent = "";
  resultSection.classList.add("hidden");

  const story = storyEl.value.trim();
  const hormone = hormoneEl.value;
  const consent = consentEl.checked;

  if (!story) {
    errorEl.textContent = "Please enter a short story (1–3 sentences).";
    return;
  }
  if (!consent) {
    errorEl.textContent = "Please give consent to rephrase the story.";
    return;
  }
  if (containsHarmfulContent(story)) {
    errorEl.textContent = "The story appears to contain harmful content; please use a different story.";
    return;
  }

  const transformed = transformStory(story, hormone);
  outputEl.textContent = transformed;
  resultSection.classList.remove("hidden");
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  }
});

resetBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  outputEl.textContent = "";
});

// Minimal harmful-content check (demo only)
function containsHarmfulContent(text) {
  const lowered = text.toLowerCase();
  const forbidden = ["suicide", "kill myself", "self-harm", "hurt myself", "bomb", "how to hurt"];
  return forbidden.some((s) => lowered.includes(s));
}

// Heuristic transformations
function transformStory(story, hormone) {
  // Break into sentences (very naive)
  const sentences = story.split(/(?<=[.?!])\s+/).filter(Boolean);
  // We'll rephrase each sentence with a small rule set
  const rewrites = sentences.map((s, idx) =>
    rewriteSentence(s.trim(), hormone, idx, sentences.length)
  );
  // Join keeping similar length/pacing
  return rewrites.join(" ");
}

function rewriteSentence(s, hormone, idx, total) {
  switch (hormone) {
    case "oxytocin":
      return oxytocinize(s, idx, total);
    case "dopamine":
      return dopamineize(s, idx, total);
    case "adrenaline":
      return adrenalineize(s, idx, total);
    case "serotonin":
      return serotoninize(s, idx, total);
    case "endorphin":
      return endorphinize(s, idx, total);
    default:
      return s;
  }
}

function oxytocinize(s, idx, total) {
  // add gentle social cues, warmth, inclusive language
  const gentle = s.replace(/\b(found|saw|picked|opened|noticed)\b/i, (m) => `${m} with a soft smile`);
  const companion = idx === total - 1 ? " They imagined sharing the moment with someone they cared about." : "";
  return ensureWarmTone(gentle + companion);
}

function dopamineize(s, idx) {
  // emphasize anticipation, novelty, mini-cliffhangers
  const hook = s.replace(/\b(wondered|thought|imagined)\b/i, (m) => `felt a spark and ${m}`);
  // add a prompt of "what if" or "next"
  const tease = " What could come next?";
  return ensureEnergeticTone(hook + (idx === 0 ? tease : ""));
}

function adrenalineize(s, idx) {
  // short sentences, present-tense verbs, immediate sensory words
  const short = s
    .replace(/\b(found|saw|picked up|ran|walked)\b/i, (m) => `${m}`)
    .replace(/ and /gi, ". ")
    .replace(/, /g, ". ");
  const punch = short.split(".").map((t) => t.trim()).filter(Boolean).slice(0, 2).join(". ");
  // Add a mild heartbeat word for urgency but avoid panic terms
  return (punch + (punch.endsWith(".") ? "" : "." ) + " His breath tightened for a moment.").replace(/\s+/g, " ");
}

function serotoninize(s, idx) {
  // calm, steady, orderly phrasing
  const formal = s.replace(/\b(wondered|wondering|maybe|might)\b/gi, (m) => {
    if (/wondered/i.test(m)) return "considered with quiet clarity";
    return "considered";
  });
  const closure = idx === 0 ? " He set a small, steady plan to follow through." : "";
  return (formal + closure).replace(/\s+/g, " ");
}

function endorphinize(s, idx) {
  // playful language, surprise, light relief
  const playful = s.replace(/\b(found|saw|noticed)\b/i, (m) => `stumbled upon, as if the universe had left it as a joke — ${m}`);
  const chuckle = idx === totalSentences(s) - 1 ? " He couldn't help but smile." : "";
  return (playful + chuckle).replace(/\s+/g, " ");
}

// Helpers for tone
function ensureWarmTone(text) {
  if (!/together|we|they|friend|smile/i.test(text)) {
    return text + " It felt like something to share with someone who mattered.";
  }
  return text;
}
function ensureEnergeticTone(text) {
  if (!/imagine|spark|next|soon|discover/i.test(text)) {
    return text + " The next moment promised something new.";
  }
  return text;
}

function totalSentences(text) {
  return text.split(/(?<=[.?!])\s+/).filter(Boolean).length;
}
