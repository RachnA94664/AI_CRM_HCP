import json
from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_interaction_from_text(text: str) -> dict:
    resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": (
                    "Extract CRM fields from the text and return ONLY valid JSON.\n"
                    "Keys: hcp_name, interaction_type, notes, sentiment.\n"
                    "notes MUST be a short sentence summary (never null). "
                    "If unsure, set notes to the original input text.\n"
                    "interaction_type should be one of: meeting, call, email, visit, other.\n"
                    "sentiment should be one of: positive, neutral, negative.\n"
                    "Use null only if truly unknown (except notes)."
                )
            },
            {"role": "user", "content": text}
        ],
    )

    data = json.loads(resp.choices[0].message.content)

    # Safety fallback
    if not data.get("notes"):
        data["notes"] = text

    return data