# backend/app.py

from flask import Flask
from flask_cors import CORS
from backend.routes.jobs import jobs_bp
from backend.routes.candidates import candidates_bp
from backend.routes.questions import questions_bp

def create_app():
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Register blueprints
    app.register_blueprint(jobs_bp, url_prefix="/jobs")
    app.register_blueprint(candidates_bp, url_prefix="/candidates")
    app.register_blueprint(questions_bp, url_prefix="/questions")

    # Root route
    @app.route('/')
    def index():
        return "<h1>TalentMatch API is running 🚀</h1><p>Available endpoints: /jobs, /candidates, /questions</p>"

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
