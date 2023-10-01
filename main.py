from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
import openai

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://krishnamchat56:VPQ1HnZedor43DGA@cluster0.xl2vgp2.mongodb.net/Cluster0"  # Replace with your actual URI
mongo = PyMongo(app)

openai.api_key = "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"

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    return render_template("index.html", myChats=myChats)

@app.route("/api", methods=["POST"])
def qa():
    if request.method == "POST":
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        if chat:
            data = {"question": question, "answer": f"{chat['answer']}"}
            return jsonify(data)
        else:
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=question,
                temperature=0.7,
                max_tokens=256,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            data = {"question": question, "answer": response["choices"][0]["text"]}
            mongo.db.chats.insert_one({"question": question, "answer": response["choices"][0]["text"]})
            return jsonify(data)
    else:
        data = {
            "result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss?"
        }
        return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
