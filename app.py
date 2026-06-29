from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load medicine data
with open("medicines.json", "r", encoding="utf-8") as file:
    medicines = json.load(file)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/search")
def search():
    query = request.args.get("q", "").strip().lower()

    if not query:
        return jsonify([])

    results = []

    for medicine in medicines:
        searchable_text = " ".join([
            medicine["name"],
            medicine["uses"],
            medicine["dosage"],
            medicine["sideEffects"],
            medicine["age"],
            medicine["precautions"]
        ]).lower()

        if query in searchable_text:
            results.append(medicine)

    return jsonify(results)


@app.route("/medicines")
def get_all():
    return jsonify(medicines)


if __name__ == "__main__":
    app.run(debug=True)
