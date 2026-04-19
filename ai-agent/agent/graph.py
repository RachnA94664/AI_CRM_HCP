import json

from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph, END

from agent.state import AgentState
from agent.prompts import (
    INTENT_DETECTION_PROMPT,
    INTERACTION_EXTRACTION_PROMPT
)
from llm.groq_client import get_llm


llm = get_llm()


# =========================
# 1️⃣ Intent Detection Node
# =========================
def detect_intent(state: AgentState) -> AgentState:
    print("✅ detect_intent node executed")

    messages = state.get("messages", [])

    if not messages:
        state["intent"] = "unknown"
        return state

    latest_message = messages[-1].content

    response = llm.invoke([
        HumanMessage(content=INTENT_DETECTION_PROMPT),
        HumanMessage(content=latest_message)
    ])

    intent = response.content.strip().lower()

    if intent not in ["log_interaction", "edit_interaction"]:
        intent = "unknown"

    state["intent"] = intent
    print("Detected intent:", intent)

    return state


# =========================
# 2️⃣ Router
# =========================
def route_intent(state: AgentState) -> str:
    """
    Determines next node based on detected intent.
    """
    intent = state.get("intent", "unknown")

    if intent == "log_interaction":
        return "extract_interaction_data"

    if intent == "edit_interaction":
        return "edit_interaction"

    return END


# =========================
# 3️⃣ Extraction Node
# =========================
def extract_interaction_data(state: AgentState) -> AgentState:
    print("➡️ Entered extract_interaction_data node")

    messages = state.get("messages", [])
    if not messages:
        state["error"] = "No messages available for extraction"
        return state

    latest_message = messages[-1].content

    try:
        response = llm.invoke([
            HumanMessage(content=INTERACTION_EXTRACTION_PROMPT),
            HumanMessage(content=latest_message)
        ])

        extracted_json = response.content.strip()
        data = json.loads(extracted_json)

        state["extracted_data"] = data
        print("✅ Extracted Data:", data)

    except json.JSONDecodeError:
        state["error"] = "Failed to parse LLM JSON output"
        print("❌ JSON parsing failed")

    except Exception as e:
        state["error"] = str(e)
        print("❌ Extraction error:", str(e))

    return state


# =========================
# 4️⃣ Persistence Node (Mock)
# =========================
def persist_interaction(state: AgentState) -> AgentState:
    print("💾 Entered persist_interaction node")

    extracted = state.get("extracted_data")

    if not extracted:
        state["error"] = "No extracted data available for persistence"
        return state

    # Placeholder — later this will call FastAPI backend
    state["tool_result"] = {
        "status": "success",
        "interaction_id": "TEMP123"
    }

    print("✅ Interaction persisted (mock)")

    return state


# =========================
# 5️⃣ Edit Placeholder Node
# =========================
def edit_interaction_node(state: AgentState) -> AgentState:
    print("➡️ Entered edit_interaction_node")
    return state


# =========================
# 6️⃣ Graph Builder
# =========================
def build_graph():
    workflow = StateGraph(AgentState)

    # Add Nodes
    workflow.add_node("detect_intent", detect_intent)
    workflow.add_node("extract_interaction_data", extract_interaction_data)
    workflow.add_node("persist_interaction", persist_interaction)
    workflow.add_node("edit_interaction", edit_interaction_node)

    # Entry Point
    workflow.set_entry_point("detect_intent")

    # Conditional Routing
    workflow.add_conditional_edges(
        "detect_intent",
        route_intent,
        {
            "extract_interaction_data": "extract_interaction_data",
            "edit_interaction": "edit_interaction",
            END: END
        }
    )

    # Sequential Flow for Log Interaction
    workflow.add_edge("extract_interaction_data", "persist_interaction")
    workflow.add_edge("persist_interaction", END)

    # Edit Flow ends for now
    workflow.add_edge("edit_interaction", END)

    return workflow.compile()