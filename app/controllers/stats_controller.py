from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.stats_service import JobPlacementStatsService
from app.utils.authentication import authenticate_admin

class JobPlacementStatsResource(Resource):

    @jwt_required()
    @authenticate_admin()  # Ensure only admins can access this
    def get(self):
        """Fetch job placement statistics."""
        stats = JobPlacementStatsService.get_job_placement_stats()
        return {"message": "Job placement statistics", "data": stats}, 200