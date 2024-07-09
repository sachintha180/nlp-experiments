import json
import string

from flask import Flask, jsonify, request
from flask_cors import CORS
from nltk import ne_chunk, pos_tag, word_tokenize
from nltk.chunk import tree2conlltags
from nltk.stem import PorterStemmer, WordNetLemmatizer

app = Flask(__name__)
CORS(app)

NEWS_DATA_FILEPATH = "docs/News_Category_Dataset_v3.json"
BASE_DATA = {"documents": [], "tokens": [], "tags": []}
data = BASE_DATA.copy()


def load_json(json_filepath: str):
    dicts: list[dict] = []
    with open(json_filepath, "r", encoding="utf-8") as file:
        for line in file:
            dicts.append(json.loads(line))
    return dicts


def dicts_to_texts(dicts: list[dict]):
    texts = []
    for d in dicts:
        texts.append(
            f"{d['category']} - {d['headline']}\n{d['short_description']}\n{d['authors']} - {d['date']}"
        )
    return texts


def prepare_fname(headline: str, max_chars=20):
    cleaned = headline.lower().replace(" ", "_")[:max_chars]
    for c in string.punctuation + "“”‘’‹›«»":
        cleaned = cleaned.replace(c, "")
    return cleaned


@app.route("/", methods=["GET"])
def index():
    return "NLP Experiments - Backend."


@app.route("/documents", methods=["GET"])
def documents():
    global data
    try:
        max: int = int(request.args.get("max"))
    except Exception as e:
        return jsonify({"data": data, "error": e})

    if max > 100:
        return jsonify({"data": data, "error": "Too many documents to fetch"})

    try:
        dicts = load_json(NEWS_DATA_FILEPATH)
        texts = dicts_to_texts(dicts)
        data = BASE_DATA.copy()
        data["documents"] = texts[:max]
    except Exception as e:
        return jsonify({"data": data, "error": e})

    # # To save dictionary content as text files into the output/ folder
    # MAX_DOCS_TO_SAVE = 10000
    # for text, d in zip(texts[:MAX_DOCS_TO_SAVE], dicts[:MAX_DOCS_TO_SAVE]):
    #     fname = prepare_fname(headline=d["headline"])
    #     with open(f"output/{fname}.txt", "w") as file:
    #         file.write(text)

    return jsonify({"data": data, "error": ""})


@app.route("/preprocess", methods=["GET"])
def preprocess():
    global data
    try:
        do = request.args.get("do")
    except Exception as e:
        return jsonify({"data": data, "error": e})

    match do:
        case "lowercase":
            for i in range(len(data["documents"])):
                data["documents"][i] = data["documents"][i].lower()
        case "punctuation":
            for i in range(len(data["documents"])):
                for p in string.punctuation:
                    data["documents"][i] = data["documents"][i].replace(p, "")
        case "lemmatize":
            wnl = WordNetLemmatizer()
            for i in range(len(data["documents"])):
                data["documents"][i] = " ".join(
                    map(wnl.lemmatize, data["documents"][i].split())
                )
        case "stem":
            stemmer = PorterStemmer()
            for i in range(len(data["documents"])):
                data["documents"][i] = " ".join(
                    map(stemmer.stem, data["documents"][i].split())
                )
        case _:
            return jsonify({"data": data, "error": "Invalid operation"})

    return jsonify({"data": data, "error": ""})


@app.route("/tokenize", methods=["GET"])
def tokenize():
    global data
    try:
        do = request.args.get("do")
    except Exception as e:
        return jsonify({"data": data, "error": e})

    match do:
        case "whitespace":
            data["tokens"] = list(map(word_tokenize, data["documents"]))
        case _:
            return jsonify({"data": data, "error": "Invalid operation"})

    return jsonify({"data": data, "error": ""})


@app.route("/process", methods=["GET"])
def process():
    global data
    try:
        do = request.args.get("do")
    except Exception as e:
        return jsonify({"data": data, "error": e})

    match do:
        case "tag":
            if not data["tokens"]:
                return jsonify(
                    {"data": data, "error": "Please tokenize the documents first"}
                )
            data["tags"] = list(map(pos_tag, data["tokens"]))
        case "ner":
            if not data["tags"]:
                return jsonify(
                    {
                        "data": data,
                        "error": "Please tag the documents with parts of speech (POS) first",
                    }
                )

            for i in range(len(data["tags"])):
                chunks = ne_chunk(data["tags"][i])
                data["tags"][i] = tree2conlltags(chunks)

        case _:
            return jsonify({"data": data, "error": "Invalid operation"})

    return jsonify({"data": data, "error": ""})


if __name__ == "__main__":
    app.run(debug=True)
