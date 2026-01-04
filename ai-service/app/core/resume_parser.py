import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

def parse_resume(file_path):
    text = extract_text_from_pdf(file_path)
    
    # Basic normalization
    text = text.replace('\n', ' ').strip()
    
    # Extract Email
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    email = re.findall(email_pattern, text)
    
    # Extract Phone (Simple US/International pattern)
    phone_pattern = r'(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}'
    phone = re.findall(phone_pattern, text)
    
    # Extract Skills (Simple Keyword Matching)
    # In a real app, load this from a DB or fine-tuned model
    skills_db = [
        "Python", "Java", "JavaScript", "React", "Node.js", "Express", "MongoDB", "SQL",
        "AWS", "Docker", "Kubernetes", "Git", "Machine Learning", "Data Science", "C++",
        "HTML", "CSS", "Tailwind", "Redux", "TypeScript"
    ]
    
    found_skills = []
    for skill in skills_db:
        if re.search(r'\b' + re.escape(skill) + r'\b', text, re.IGNORECASE):
            found_skills.append(skill)
            
    return {
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None,
        "skills": found_skills,
        "raw_text": text[:500] + "..." # Preview
    }
