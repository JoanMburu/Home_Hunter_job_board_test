from flask import Blueprint
from flask_restful import Api
from app.controllers.stats_controller import JobPlacementStatsResource

stats_bp = Blueprint('stats_bp', __name__)
api = Api(stats_bp)

# Add route for job placement statistics
api.add_resource(JobPlacementStatsResource, '/job-placement')