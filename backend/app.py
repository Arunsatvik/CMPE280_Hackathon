from flask import Flask, request, jsonify
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.indexes import VectorstoreIndexCreator
from flask_cors import CORS
import nltk
import os

# Specify the path to the NLTK data directory
nltk_data_path = "/Users/SATVIK/nltk_data"
nltk.data.path.append(nltk_data_path)

# Ensure NLTK is properly configured by downloading necessary resources
try:
    nltk.data.find("tokenizers/punkt", paths=[nltk_data_path])
except LookupError:
    nltk.download('punkt', download_dir=nltk_data_path)

# Explicitly set the path to the averaged_perceptron_tagger.pickle file
nltk.data.path.append("/Users/SATVIK/nltk_data/")

app = Flask(__name__)
CORS(app)

# Assuming your existing setup for loading and indexing PDFs
# Initialize your PDF loaders and index here
# Example (you should replace this with your actual code):
pdf_folder_path = "./data"
print(os.listdir(pdf_folder_path))
loaders = [UnstructuredPDFLoader(os.path.join(pdf_folder_path, fn)) for fn in os.listdir(pdf_folder_path)]
# embeddings = OpenAIEmbeddings(openai_api_key='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')
print(loaders)
index = VectorstoreIndexCreator().from_loaders(loaders)

@app.route('/answer', methods=['POST'])
def answer_question():
    data = request.json
    query = data.get('question')

    if not query:
        return jsonify({"error": "No question provided"}), 400

    # Use your index to find the relevant answer
    # Ensure that the response is a string
    query_response = index.query_with_sources(query)
    
    # Assuming query_response is a dictionary with the structure:
    # { "answer": "Some answer text", "question": "Original question text", "sources": "Some sources information" }
    # Extract the 'answer' text and send it back
    answer_text = query_response.get('answer', 'No answer found')
    if not isinstance(answer_text, str):
        # Handle case where answer is not a string
        # For example, convert it to a string or handle as appropriate
        answer_text = str(answer_text)

    return jsonify({"answer": answer_text})

if __name__ == '__main__':
    app.run(debug=True)
