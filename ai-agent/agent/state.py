from typing import TypedDict, List, Optional, Dict, Any
from langchain_core.messages import BaseMessage


class AgentState(TypedDict, total=False):
    """
    Central state object passed between LangGraph nodes.
    """

    # Conversation history
    messages: List[BaseMessage]

    # Detected user intent (e.g., log_interaction, edit_interaction)
    intent: Optional[str]

    # Structured data extracted from user input
    extracted_data: Optional[Dict[str, Any]]

    # Tool execution result
    tool_result: Optional[Dict[str, Any]]

    # Error tracking
    error: Optional[str]