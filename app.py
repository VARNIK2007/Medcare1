from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Load medicine data once
with open("medicines.json", "r", encoding="utf-8") as f:
    medicines = json.load(f)


# Home page route
@app.route("/")
def home():
    return render_template("index.html")


# API: Search medicine
@app.route("/search", methods=["GET"])
def search_medicine():
    query = request.args.get("q", "").lower()

    results = []

    for med in medicines:
        if query in med["name"].lower():
            results.append(med)

    return jsonify(results)


# API: Get all medicines (optional)
@app.route("/medicines")
def get_all_medicines():
    return jsonify(medicines)


# Run server
if __name__ == "__main__":
    app.run(debug=True)