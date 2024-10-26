from faker import Faker
from app import create_app, db
from app.models.member import Member
from app.models.employer import Employer
from app.models.job import Job
from app.models.job_application import JobApplication  # Import JobApplication model
from datetime import datetime, timedelta

fake = Faker()

def seed_members(count=10):
    """Seeds the database with fake Member data."""
    for _ in range(count):
        member_data = {
            'name': fake.name(),
            'phone': fake.phone_number(),
            'email': fake.email(),
            'role': fake.random_element(elements=("member", "admin", "supervisor")),
            'is_active': True
        }
        if Member.query.filter_by(email=member_data['email']).first() or Member.query.filter_by(phone=member_data['phone']).first():
            continue
        member = Member(**member_data)
        member.set_password('password123')
        db.session.add(member)

    db.session.commit()

def seed_employers(count=5):
    """Seeds the database with fake Employer data."""
    for _ in range(count):
        employer_data = {
            'company_name': fake.company(),
            'email': fake.company_email(),
            'phone': fake.phone_number(),
            'about': fake.text(),
            'password': 'password123'
        }
        if Employer.query.filter_by(email=employer_data['email']).first() or Employer.query.filter_by(phone=employer_data['phone']).first():
            continue
        employer = Employer(**employer_data)
        employer.set_password('password123')
        db.session.add(employer)
    
    db.session.commit()

def seed_jobs(count=15):
    """Seeds the database with fake Job data."""
    employers = Employer.query.all()
    if not employers:
        print("Please seed employers first.")
        return

    for _ in range(count):
        job_data = {
            'title': fake.job(),
            'description': fake.text(),
            'salary': fake.random_element(elements=("50k", "60k", "70k", "80k")),
            'deadline': datetime.utcnow() + timedelta(days=fake.random_int(min=10, max=90)),
            'employer_id': fake.random_element(employers).id
        }
        job = Job(**job_data)
        db.session.add(job)

    db.session.commit()

def seed_job_applications(count=20):
    """Seeds the database with fake Job Application data."""
    members = Member.query.all()
    jobs = Job.query.all()

    if not members or not jobs:
        print("Please seed members and jobs first.")
        return

    for _ in range(count):
        application_data = {
            'resume': fake.file_path(),  # Simulating a resume file path
            'cover_letter': fake.file_path(),  # Simulating a cover letter file path
            'member_id': fake.random_element(members).id,  # Randomly select a member
            'job_id': fake.random_element(jobs).id,  # Randomly select a job
            'status': fake.random_element(elements=("applied", "interviewed", "hired", "rejected")),
            'created_at': datetime.utcnow()
        }
        job_application = JobApplication(**application_data)
        db.session.add(job_application)

    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()  # Ensure tables are created
        seed_members(10)  # Seed members
        seed_employers(5)  # Seed employers
        seed_jobs(15)  # Seed jobs
        seed_job_applications(20)  # Seed job applications

    print("Database seeded with fake member, employer, job, and job application data.")
