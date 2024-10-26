from app.models.job_application import JobApplication
from app import db

class JobApplicationRepository:
    @staticmethod
    def create_application(member_id, job_id, resume, cover_letter):
        new_application = JobApplication(
            member_id=member_id,
            job_id=job_id,
            resume=resume,
            cover_letter=cover_letter
        )
        db.session.add(new_application)
        db.session.commit()
        return new_application

    @staticmethod
    def get_application_by_member_and_job(member_id, job_id):
        return JobApplication.query.filter_by(member_id=member_id, job_id=job_id).first()
    

    @staticmethod
    def get_total_applications():
        """Return the total number of job applications submitted."""
        return JobApplication.query.count()

    @staticmethod
    def get_total_hires():
        """Return the total number of hires made (applications with status 'hired')."""
        return JobApplication.query.filter_by(status='hired').count()