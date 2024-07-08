# nlp-experiments

A simple dashboard to work with basic NLP operations (preprocessing, processing, modelling, etc.)

## How do I run the project?
- `cd backend`, `python -m venv env`, `source env/bin/activate`, `pip install -r requirements.txt`, `python server.py` to run the Flask server.
- `cd frontend`, `npm i` and `npm run dev` to run Vite.


## The server doesn't connect to my client
- Your server might be running at a different URL and port. 
- Find it out, and update the `SERVER_BASE_URL` variable with it in `frontend/src/lib/helpers.ts`