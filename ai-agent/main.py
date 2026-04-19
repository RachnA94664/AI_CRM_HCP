from langchain_core.messages import HumanMessage
from agent.graph import build_graph


if __name__ == "__main__":
    app = build_graph()

    initial_state = {
        "messages": [
            HumanMessage(content="I met Dr Sharma today and discussed a new oncology product.")
        ]
    }

    result = app.invoke(initial_state)

    print("\nFINAL STATE:")
    print(result)