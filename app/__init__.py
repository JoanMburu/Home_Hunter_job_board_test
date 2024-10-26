from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config
from flask_caching import Cache 
from flask_cors import CORS


# Initialize the extensions
db = SQLAlchemy()
migrate = Migrate()
cache = Cache()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Cache configuration - Use SimpleCache for testing (or Redis/Memcached in production)
    app.config['CACHE_TYPE'] = 'SimpleCache'  # For simple in-memory caching
    app.config['CACHE_DEFAULT_TIMEOUT'] = 300  # Default cache timeout (300 seconds)

    # Initialize the extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    JWTManager(app)
    cache.init_app(app) 
    CORS(app) 

    # Import and register the blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.member_routes import member_bp
    from app.routes.employer_routes import employer_bp  
    from app.routes.job_routes import job_bp 
    from app.routes.log_routes import log_bp
    from app.routes.stats_routes import stats_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(member_bp, url_prefix='/members')
    app.register_blueprint(employer_bp, url_prefix='/api/employers')
    app.register_blueprint(job_bp, url_prefix='/api/jobs')  
    app.register_blueprint(log_bp, url_prefix='/system')
    app.register_blueprint(stats_bp, url_prefix='/stats')

    return app
