from app.repositories.job_repository import JobRepository
from app.repositories.job_application_repository import JobApplicationRepository
from app import cache


class JobPlacementStatsService:

    @staticmethod
    @cache.cached(timeout=60, key_prefix="job_placement_stats")
    def get_job_placement_stats():
        """Fetch job placement statistics including jobs, applications, and hires."""
        
        # Total number of jobs posted
        total_jobs = JobRepository.get_total_jobs()

        # Total number of job applications
        total_applications = JobApplicationRepository.get_total_applications()

        # Total number of successful hires (applications where status is 'hired')
        total_hires = JobApplicationRepository.get_total_hires()

        # Return the aggregated statistics
        return {
            "total_jobs": total_jobs,
            "total_applications": total_applications,
            "total_hires": total_hires
        }