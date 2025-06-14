
import re
import json

def parse_output(raw_output):
    """
    Parse raw output containing JSON and return cleaned JSON object
    
    Args:
        raw_output (str): Raw terminal output containing JSON
        
    Returns:
        dict: Parsed and cleaned JSON object
    """
    try:
        # Extract JSON string between triple backticks
        json_str = re.search(r'```(.*?)```', raw_output, re.DOTALL).group(1)
        
        # Parse JSON and fix any formatting issues
        parsed_json = json.loads(json_str)
        
        return parsed_json
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return None
    except AttributeError:
        print("No JSON found in output")
        return None

if __name__ == "__main__":
    # Read from stdin or file
    import sys
    raw_output = sys.stdin.read()
    
    # Parse and print cleaned JSON
    cleaned_json = parse_output(raw_output)
    if cleaned_json:
        print(json.dumps(cleaned_json, indent=2))